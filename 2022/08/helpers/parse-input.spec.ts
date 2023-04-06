import { parseInput } from './parse-input';

test('parses input', () => {
  const content = `
    30
    25
  `;

  expect(parseInput(content)).toEqual([
    [3, 0],
    [2, 5],
  ]);
});
