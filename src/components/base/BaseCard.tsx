interface Character {
  char_id: number;
  img: string;
}

interface ActiveCard {
  id: number;
  index: number;
}

interface Props {
  character: Character;
  activeCards: ActiveCard[];
  matches: number[];
  index: number;
  onClickCardCallback: (index: number, id: number) => void;
}

function BaseCard({ character, activeCards, onClickCardCallback, index, matches }: Props) {
  const isMatched = matches.includes(character.char_id);
  const isFlipped =
    isMatched || activeCards.some((card) => card.index === index);

  return (
    <button
      className={`card ${isFlipped ? 'active' : ''}`}
      onClick={() => onClickCardCallback(index, character.char_id)}
      disabled={isMatched}
    >
      <img
        alt="illustration"
        src={character.img}
        loading="lazy"
        className={`card__image ${isFlipped ? 'active' : ''}`}
      />
    </button>
  );
}

export default BaseCard;
