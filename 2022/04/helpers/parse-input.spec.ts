import { parseInput } from './parse-input';

test('parses input', () => {
  const input = `
    2-4,6-8
    2-3,4-5
  `;

  expect(parseInput(input)).toEqual([
    [
      { from: 2, to: 4 },
      { from: 6, to: 8 },
    ],
    [
      { from: 2, to: 3 },
      { from: 4, to: 5 },
    ],
  ]);
});
