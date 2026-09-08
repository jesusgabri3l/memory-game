import { attemptsForLevel } from '../gameConfig';
import type { LevelConfig } from '../types';

interface Props {
  houseName: string;
  level: LevelConfig;
  onStart: () => void;
}

function StartGate({ houseName, level, onStart }: Props) {
  return (
    <div className="gate">
      <div className="gate__card">
        <h1 className="gate__title">Ready, {houseName}?</h1>
        <p className="gate__subtitle">
          Level 1 awaits: {level.pairs} pairs, {attemptsForLevel(level)} attempts,{' '}
          {level.time} seconds on the clock.
        </p>
        <button type="button" className="gate__button" onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
}

export default StartGate;
