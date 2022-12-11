import { getPriority } from './get-priority';

test.each([
  ['a', 1],
  ['z', 26],
  ['A', 27],
  ['Z', 52],
])('get priority: "%s"', (char, expected) => {
  expect(getPriority(char)).toBe(expected);
});
