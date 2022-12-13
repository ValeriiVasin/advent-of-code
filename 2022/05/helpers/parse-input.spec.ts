import { parseInput } from './parse-input';

test('parses commands', () => {
  const input = `
    move 1 from 7 to 6
    move 1 from 9 to 4
  `;
  expect(parseInput(input)).toEqual(
    expect.objectContaining({
      commands: [
        { amount: 1, from: 7, to: 6 },
        { amount: 1, from: 9, to: 4 },
      ],
    }),
  );
});

test('parses crates', () => {
  const input = `
[D]
[N] [C]
[Z] [M] [P]
 1   2   3
  `;

  expect(parseInput(input)).toEqual(
    expect.objectContaining({
      stacks: [['Z', 'N', 'D'], ['M', 'C'], ['P']],
    }),
  );
});
