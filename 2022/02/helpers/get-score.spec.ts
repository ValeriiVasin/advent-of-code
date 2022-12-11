import { getScore } from './get-score';

test('get score: part #1', () => {
  expect(getScore({ opponent: 'A', player: 'Y' })).toBe(8);
  expect(getScore({ opponent: 'B', player: 'X' })).toBe(1);
  expect(getScore({ opponent: 'C', player: 'Z' })).toBe(6);
});

test('get score: part #2', () => {
  expect(getScore({ opponent: 'A', player: 'Y' }, { adjusted: true })).toBe(4);
  expect(getScore({ opponent: 'B', player: 'X' }, { adjusted: true })).toBe(1);
  expect(getScore({ opponent: 'C', player: 'Z' }, { adjusted: true })).toBe(7);
});
