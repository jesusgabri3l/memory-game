import '@testing-library/jest-dom/vitest';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { CharactersResponse } from './mocks/characters';

export const restHandlers = [
  http.get('https://www.breakingbadapi.com/api/character/random', () => {
    return HttpResponse.json(CharactersResponse);
  }),
];
const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
