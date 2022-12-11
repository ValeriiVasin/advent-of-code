import { getPlayerValue } from './get-player-value';

test('lose', () => {
  expect(getPlayerValue({ opponent: 'A', player: 'X' })).toBe('Scissors');
});

test('draw', () => {
  expect(getPlayerValue({ opponent: 'A', player: 'Y' })).toBe('Rock');
});

test('win', () => {
  expect(getPlayerValue({ opponent: 'A', player: 'Z' })).toBe('Paper');
});
