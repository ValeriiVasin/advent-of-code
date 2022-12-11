import { parseInput } from './parse-input';

test('parses values correctly', () => {
  const input = `
    1
    2
    3

    4
    5

    6
  `;

  expect(parseInput(input)).toEqual([[1, 2, 3], [4, 5], [6]]);
});

test('throws if input is invalid', () => {
  const input = `
    hello
    world
  `;

  const fn = () => parseInput(input);

  expect(fn).toThrowError('Input is invalid.');
});
