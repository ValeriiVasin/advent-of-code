import type { Command, Options, Stack } from '../types';

export function moveCrates(
  stacks: Array<Stack>,
  commands: Command | Array<Command>,
  options?: Options,
): Array<Stack> {
  if (!Array.isArray(commands)) {
    commands = [commands];
  }

  return commands.reduce(
    (acc, command) => rearrange(acc, command, options),
    stacks,
  );
}

function rearrange(
  stacks: Array<Stack>,
  command: Command,
  options?: Options,
): Array<Stack> {
  const { part } = options ?? { part: 'one' };
  const from = command.from - 1;
  const to = command.to - 1;
  const amount = command.amount;

  const crates = stacks[from].slice(-amount);

  return stacks.map((stack, index) => {
    if (index === from) {
      return stack.slice(0, -amount);
    }

    if (index === to) {
      return part === 'one'
        ? [...stack, ...crates.reverse()]
        : [...stack, ...crates];
    }

    return [...stack];
  });
}
