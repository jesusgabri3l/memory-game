import './styles/styles.scss';

import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import GameModal from './components/GameModal';
import HouseGate from './components/HouseGate';
import StartGate from './components/StartGate';
import { useGame } from './hooks/useGame';
import { useHouseName } from './hooks/useHouseName';

function App() {
  const { houseName, setHouseName } = useHouseName();
  const game = useGame();

  if (!houseName) {
    return <HouseGate onSubmit={setHouseName} />;
  }

  if (game.error) {
    return (
      <p className="feedback">
        The Maester&apos;s ravens could not reach the Citadel. Try again later.
      </p>
    );
  }

  if (!game.characters || game.cards.length === 0) {
    return <p className="feedback">Summoning the houses...</p>;
  }

  if (!game.hasStarted) {
    return <StartGate houseName={houseName} level={game.level} onStart={game.startGame} />;
  }

  const flippedUids = game.flipped.map((card) => card.uid);

  return (
    <div className="layout">
      <GameHeader
        houseName={houseName}
        levelNumber={game.levelNumber}
        totalLevels={game.totalLevels}
        timeLeft={game.timeLeft}
        attemptsLeft={game.attemptsLeft}
      />
      <GameBoard
        cards={game.cards}
        flippedUids={flippedUids}
        matchedIds={game.matchedIds}
        onCardClick={game.flipCard}
      />
      {game.status === 'lost' && (
        <GameModal
          title="Defeat"
          message={`You have lost the battle, the banners of your house ${houseName} have been burned down.`}
          actionLabel="Retry this level"
          onAction={game.retryLevel}
        />
      )}
      {game.status === 'levelComplete' && (
        <GameModal
          title="Level cleared"
          message={`House ${houseName} has won this battle. Onward to level ${game.levelNumber + 1}.`}
          actionLabel="Continue"
          onAction={game.nextLevel}
        />
      )}
      {game.status === 'victory' && (
        <GameModal
          title="Victory"
          message={`Your house ${houseName} has conquered the Iron Throne, and you might get some rest at the Red Keep.`}
          actionLabel="Play again"
          onAction={game.restartGame}
        />
      )}
    </div>
  );
}

export default App;
