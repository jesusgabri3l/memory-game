import type { Card } from '../types';

interface Props {
  card: Card;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (uid: string, charId: number) => void;
}

function GameCard({ card, isFlipped, isMatched, onClick }: Props) {
  const active = isFlipped || isMatched;

  return (
    <button
      type="button"
      className={`card ${active ? 'active' : ''}`}
      onClick={() => onClick(card.uid, card.charId)}
      disabled={isMatched}
      aria-pressed={active}
    >
      <img
        alt=""
        src={card.img}
        loading="lazy"
        className={`card__image ${active ? 'active' : ''}`}
      />
    </button>
  );
}

export default GameCard;
