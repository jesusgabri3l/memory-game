import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('App', () => {
  it('shows a loading state before the characters arrive', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders a pair of cards for each fetched character', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(4);
    });
  });
});
