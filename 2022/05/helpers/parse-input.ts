import { getLines } from '../../helpers/get-lines';
import type { Command, ParsedInput, Stack } from '../types';

export function parseInput(input: string): ParsedInput {
  const lines = getLines(input, { trim: { content: true, lines: false } });
  return {
    stacks: parseStacks(lines),
    commands: parseCommands(lines),
  };
}

const commandsRegexp = /move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/;
function parseCommands(lines: Array<string>): Array<Command> {
  const result: Array<Command> = [];

  for (const line of lines) {
    const match = line.match(commandsRegexp);

    if (!match) {
      continue;
    }

    result.push({
      amount: Number(match.groups?.amount),
      from: Number(match.groups?.from),
      to: Number(match.groups?.to),
    });
  }

  return result;
}

const crateRegexp = /^[A-Z]$/;
function parseStacks(lines: Array<string>): Array<Stack> {
  const result: Array<Stack> = [];

  for (const line of lines) {
    if (!line.includes('[')) {
      continue;
    }

    for (const [index, crate] of splitBy(line, 4).entries()) {
      const char = crate[1];
      if (char === ' ') {
        continue;
      }

      result[index] = result[index] ? [char, ...result[index]] : [char];
    }
  }

  return result;
}

function splitBy(str: string, by: number): Array<string> {
  const result: Array<string> = [];
  for (let i = 0; i < str.length; i += by) {
    result.push(str.slice(i, i + by));
  }
  return result;
}
