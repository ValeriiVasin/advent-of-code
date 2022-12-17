import fs from 'fs';
import path from 'path';
import { getLines } from '../../helpers/get-lines';
import { Command, Part } from '../types';
import { dirStats } from './dir-stats';
import { executeCommands } from './execute-commands';
import { parseCommands } from './parse-commands';

export function getResult(fixture: string, part: Part = Part.One): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );
  const lines = getLines(content);
  const commands: Array<Command> = parseCommands(lines);
  const { fileTree } = executeCommands({ commands });
  const stats = dirStats(fileTree);

  return part === Part.One
    ? getFirstPartResult(stats)
    : getSecondPartResult(stats);
}

function getFirstPartResult(stats: Map<string, number>): number {
  const sizeLimit = 100_000;

  let result = 0;
  for (const size of stats.values()) {
    if (size > sizeLimit) {
      continue;
    }

    result += size;
  }

  return result;
}

function getSecondPartResult(stats: Map<string, number>): number {
  const totalSpace = 70_000_000;
  const requiredSpace = 30_000_000;
  const usedSpace = stats.get('/')!;
  const freeSpace = totalSpace - usedSpace;
  const orderedSizes = [...stats.values()].sort((a, b) => a - b);

  for (const size of orderedSizes) {
    if (freeSpace + size >= requiredSpace) {
      return size;
    }
  }

  throw new Error('Result can not be found');
}
