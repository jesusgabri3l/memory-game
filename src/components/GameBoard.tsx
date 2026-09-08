import type { Card } from '../types';
import GameCard from './GameCard';

interface Props {
  cards: Card[];
  flippedUids: string[];
  matchedIds: Set<number>;
  onCardClick: (uid: string, charId: number) => void;
}

function GameBoard({ cards, flippedUids, matchedIds, onCardClick }: Props) {
  return (
    <div className="board">
      {cards.map((card) => (
        <GameCard
          key={card.uid}
          card={card}
          isFlipped={flippedUids.includes(card.uid)}
          isMatched={matchedIds.has(card.charId)}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;
