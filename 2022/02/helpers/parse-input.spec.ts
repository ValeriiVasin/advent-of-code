import { parseInput } from './parse-input';

test('parsing input', () => {
  const input = `
    A Y
    B X
    C Z
  `;

  expect(parseInput(input)).toEqual([
    { opponent: 'A', player: 'Y' },
    { opponent: 'B', player: 'X' },
    { opponent: 'C', player: 'Z' },
  ]);
});

test('throws if input is not valid', () => {
  const input = `
    hello
    world
  `;
  const parse = () => parseInput(input);
  expect(parse).toThrowError('Invalid input');
});
