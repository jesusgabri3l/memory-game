import './styles/styles.scss';

import axios from 'axios';
import { useEffect, useState } from 'react';

import BaseCard from './components/base/BaseCard';

interface Character {
  char_id: number;
  img: string;
}

interface ActiveCard {
  id: number;
  index: number;
}

interface ThronesCharacter {
  id: number;
  imageUrl: string;
}

function pickRandom<T>(items: T[], count: number): T[] {
  return [...items].sort(() => 0.5 - Math.random()).slice(0, count);
}

function App() {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [activeCards, setActiveCards] = useState<ActiveCard[]>([]);
  const [matches, setMatches] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onClickCardCallback = (index: number, id: number) => {
    setActiveCards((current) => [...current, { id, index }]);
  };

  useEffect(() => {
    if (activeCards.length === 2) {
      const isEqual = activeCards[0].id === activeCards[1].id;
      setTimeout(() => {
        if (isEqual) setMatches((current) => [...current, activeCards[0].id]);
        setActiveCards([]);
      }, 1000);
    }
  }, [activeCards]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const { data } = await axios<ThronesCharacter[]>(
        'https://thronesapi.com/api/v2/Characters',
      );
      const characters = pickRandom(data, 5).map((character) => ({
        char_id: character.id,
        img: character.imageUrl,
      }));
      const pairsArray = [...characters, ...characters];
      setCharacters(pairsArray.sort(() => 0.5 - Math.random()));
      setLoading(false);
    };
    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="layout">
      {characters?.map((character, index) => (
        <BaseCard
          character={character}
          key={index}
          activeCards={activeCards}
          onClickCardCallback={onClickCardCallback}
          index={index}
          matches={matches}
        />
      ))}
    </div>
  );
}

export default App;
