import { getGameResult } from './get-game-result';

test('win', () => {
  expect(getGameResult({ opponent: 'A', player: 'Y' })).toBe('Win');
});

test('lose', () => {
  expect(getGameResult({ opponent: 'B', player: 'X' })).toBe('Lose');
});

test('draw', () => {
  expect(getGameResult({ opponent: 'A', player: 'X' })).toBe('Draw');
});
