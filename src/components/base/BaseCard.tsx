function BaseCard({ character, activeCards, onClickCardCallback, index, matches }: any) {
  return (
    <button
      className={`card ${
        (matches.includes(character.char_id) ||
          activeCards.find((card: any) => card.index === index)) &&
        'active'
      }`}
      onClick={() => onClickCardCallback(index, character.char_id)}
      disabled={matches.includes(character.chard_id)}
    >
      <img
        alt="illustration"
        src={character.img}
        loading="lazy"
        className={`card__image ${
          (matches.includes(character.char_id) ||
            activeCards.find((card: any) => card.index === index)) &&
          'active'
        }`}
      />
    </button>
  );
}

export default BaseCard;
