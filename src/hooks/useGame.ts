import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { attemptsForLevel, buildLevelCards, CHARACTERS_ENDPOINT, LEVELS } from '../gameConfig';
import type { Card, ThronesCharacter } from '../types';

export type GameStatus = 'playing' | 'levelComplete' | 'lost' | 'victory';

interface FlippedCard {
  uid: string;
  charId: number;
}

export function useGame() {
  const [characters, setCharacters] = useState<ThronesCharacter[] | null>(null);
  const [error, setError] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<FlippedCard[]>([]);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResolving, setIsResolving] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const resolveTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const startLevel = useCallback((index: number, pool: ThronesCharacter[]) => {
    const level = LEVELS[index];
    setCards(buildLevelCards(pool, level.pairs));
    setFlipped([]);
    setMatchedIds(new Set());
    setAttemptsLeft(attemptsForLevel(level));
    setTimeLeft(level.time);
    setIsResolving(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    axios
      .get<ThronesCharacter[]>(CHARACTERS_ENDPOINT)
      .then(({ data }) => {
        if (cancelled) return;
        setCharacters(data);
        startLevel(0, data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPairs = cards.length / 2;
  const status: GameStatus = isResolving
    ? 'playing'
    : totalPairs > 0 && matchedIds.size === totalPairs
      ? levelIndex === LEVELS.length - 1
        ? 'victory'
        : 'levelComplete'
      : attemptsLeft <= 0 || timeLeft <= 0
        ? 'lost'
        : 'playing';

  useEffect(() => {
    if (status !== 'playing' || !hasStarted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [status, levelIndex, hasStarted]);

  useEffect(() => {
    return () => clearTimeout(resolveTimeout.current);
  }, []);

  const flipCard = useCallback(
    (uid: string, charId: number) => {
      if (status !== 'playing' || isResolving || !hasStarted) return;
      if (flipped.length >= 2) return;
      if (flipped.some((card) => card.uid === uid)) return;

      const next = [...flipped, { uid, charId }];
      setFlipped(next);

      if (next.length === 2) {
        setIsResolving(true);
        setAttemptsLeft((prev) => prev - 1);
        resolveTimeout.current = setTimeout(() => {
          if (next[0].charId === next[1].charId) {
            setMatchedIds((prev) => new Set(prev).add(next[0].charId));
          }
          setFlipped([]);
          setIsResolving(false);
        }, 900);
      }
    },
    [flipped, status, isResolving, hasStarted],
  );

  const startGame = useCallback(() => {
    setHasStarted(true);
  }, []);

  const retryLevel = useCallback(() => {
    if (characters) startLevel(levelIndex, characters);
  }, [characters, levelIndex, startLevel]);

  const nextLevel = useCallback(() => {
    if (!characters) return;
    const next = levelIndex + 1;
    setLevelIndex(next);
    startLevel(next, characters);
  }, [characters, levelIndex, startLevel]);

  const restartGame = useCallback(() => {
    if (!characters) return;
    setLevelIndex(0);
    startLevel(0, characters);
  }, [characters, startLevel]);

  return {
    characters,
    error,
    level: LEVELS[levelIndex],
    levelNumber: levelIndex + 1,
    totalLevels: LEVELS.length,
    cards,
    flipped,
    matchedIds,
    attemptsLeft,
    timeLeft,
    status,
    hasStarted,
    startGame,
    flipCard,
    retryLevel,
    nextLevel,
    restartGame,
  };
}
