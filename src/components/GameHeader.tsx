interface Props {
  houseName: string;
  levelNumber: number;
  totalLevels: number;
  timeLeft: number;
  attemptsLeft: number;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

function GameHeader({ houseName, levelNumber, totalLevels, timeLeft, attemptsLeft }: Props) {
  return (
    <header className="hud">
      <div className="hud__item">
        <span className="hud__label">House</span>
        <span className="hud__value">{houseName}</span>
      </div>
      <div className="hud__item">
        <span className="hud__label">Level</span>
        <span className="hud__value">
          {levelNumber} / {totalLevels}
        </span>
      </div>
      <div className="hud__item">
        <span className="hud__label">Time</span>
        <span className={`hud__value ${timeLeft <= 10 ? 'hud__value--danger' : ''}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="hud__item">
        <span className="hud__label">Attempts left</span>
        <span className={`hud__value ${attemptsLeft <= 2 ? 'hud__value--danger' : ''}`}>
          {attemptsLeft}
        </span>
      </div>
    </header>
  );
}

export default GameHeader;
