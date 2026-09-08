import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '../App';

async function enterHouseNameAndStart(name: string) {
  const user = userEvent.setup();
  render(<App />);
  const input = await screen.findByLabelText('House name');
  await user.type(input, name);
  await user.click(screen.getByRole('button', { name: /take the iron throne/i }));

  await screen.findByRole('button', { name: /^start$/i });
  await user.click(screen.getByRole('button', { name: /^start$/i }));
}

describe('App', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('asks for the house name before anything else', () => {
    render(<App />);
    expect(screen.getByLabelText('House name')).toBeInTheDocument();
  });

  it('shows a start screen before level 1 begins', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = await screen.findByLabelText('House name');
    await user.type(input, 'House Stark');
    await user.click(screen.getByRole('button', { name: /take the iron throne/i }));

    expect(await screen.findByText(/Ready, House Stark/)).toBeInTheDocument();
  });

  it('starts level 1 with the entered house name once the player hits start', async () => {
    await enterHouseNameAndStart('House Stark');

    expect(await screen.findByText('House Stark')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: '' })).toHaveLength(8);
    });
  });

  it('only allows two cards flipped at once', async () => {
    await enterHouseNameAndStart('House Stark');

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: '' })).toHaveLength(8);
    });
    const user = userEvent.setup();
    const cards = screen.getAllByRole('button', { name: '' });

    await user.click(cards[0]);
    await user.click(cards[1]);
    await user.click(cards[2]);

    const flipped = cards.filter((card) => card.getAttribute('aria-pressed') === 'true');
    expect(flipped).toHaveLength(2);
  });
});
