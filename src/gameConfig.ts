import type { Card, LevelConfig, ThronesCharacter } from './types';

export const HOUSE_STORAGE_KEY = 'memory-game:house';
export const CHARACTERS_ENDPOINT = 'https://thronesapi.com/api/v2/Characters';

export const LEVELS: LevelConfig[] = [
  { pairs: 4, time: 40 },
  { pairs: 6, time: 50 },
  { pairs: 8, time: 60 },
  { pairs: 10, time: 70 },
];

export function attemptsForLevel(level: LevelConfig): number {
  return level.pairs * 3;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => 0.5 - Math.random());
}

export function pickRandom<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count);
}

export function buildLevelCards(pool: ThronesCharacter[], pairs: number): Card[] {
  const chosen = pickRandom(pool, pairs);
  const pairCards = chosen.flatMap((character) => [
    { uid: `${character.id}-a`, charId: character.id, img: character.imageUrl },
    { uid: `${character.id}-b`, charId: character.id, img: character.imageUrl },
  ]);
  return shuffle(pairCards);
}
