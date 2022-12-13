import type { Command, Stack } from '../types';
import { moveCrates } from './move-crates';

test('move', () => {
  const stacks: Array<Stack> = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
  const command: Command = { amount: 1, from: 2, to: 1 };

  expect(moveCrates(stacks, command)).toEqual([
    ['Z', 'N', 'D'],
    ['M', 'C'],
    ['P'],
  ]);
});

describe('move with few commands', () => {
  const stacks: Array<Stack> = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
  const commands: Array<Command> = [
    { amount: 1, from: 2, to: 1 },
    { amount: 3, from: 1, to: 3 },
    { amount: 2, from: 2, to: 1 },
    { amount: 1, from: 1, to: 2 },
  ];

  test('part #1', () => {
    expect(moveCrates(stacks, commands)).toEqual([
      ['C'],
      ['M'],
      ['P', 'D', 'N', 'Z'],
    ]);
  });

  test('part #2', () => {
    expect(moveCrates(stacks, commands, { part: 'two' })).toEqual([
      ['M'],
      ['C'],
      ['P', 'Z', 'N', 'D'],
    ]);
  });
});
