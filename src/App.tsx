import './styles/styles.scss';

import axios from 'axios';
import { useEffect, useState } from 'react';

import BaseCard from './components/base/BaseCard';

function App() {
  const [characters, setCharacters] = useState<Array<unknown> | null>(null);
  const [activeCards, setActiveCards] = useState<Array<any>>([]);
  const [matches, setMatches] = useState<Array<number>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onClickCardCallback = (index: number, id: number) => {
    setActiveCards((current: Array<number>) => [...current, { id, index }]);
  };

  useEffect(() => {
    if (activeCards.length === 2) {
      const isEqual = activeCards[0].id === activeCards[1].id;
      setTimeout(() => {
        if (isEqual)
          setMatches((current: Array<number>) => [...current, activeCards[0].id]);
        setActiveCards([]);
      }, 1000);
    }
  }, [activeCards]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const { data } = await axios(
        'https://www.breakingbadapi.com/api/character/random?limit=5',
      );
      const pairsArray = [...data, ...data];
      setCharacters(pairsArray.sort(() => 0.5 - Math.random()));
      setLoading(false);
    };
    fetchCharacters();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="layout">
      {characters
        ? characters.map((character: any, index: number) => (
            <BaseCard
              character={character}
              key={index}
              activeCards={activeCards}
              onClickCardCallback={onClickCardCallback}
              index={index}
              matches={matches}
            />
          ))
        : null}
    </div>
  );
}

export default App;
