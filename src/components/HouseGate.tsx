import { useState, type FormEvent } from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

function HouseGate({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
  };

  return (
    <div className="gate">
      <form className="gate__card" onSubmit={handleSubmit}>
        <h1 className="gate__title">Enter the Great Game</h1>
        <p className="gate__subtitle">
          Before you take your seat, tell us the name of your house.
        </p>
        <input
          className="gate__input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="House Stark"
          aria-label="House name"
          autoFocus
        />
        <button type="submit" className="gate__button" disabled={!value.trim()}>
          Take the Iron Throne
        </button>
      </form>
    </div>
  );
}

export default HouseGate;
