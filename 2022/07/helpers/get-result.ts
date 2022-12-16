import fs from 'fs';
import path from 'path';
import { getLines } from '../../helpers/get-lines';
import type { Command } from '../types';
import { dirStats } from './dir-stats';
import { executeCommands } from './execute-commands';
import { parseCommands } from './parse-commands';

export function getResult(
  fixture: string,
  sizeLimit: number = 100_000,
): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );
  const lines = getLines(content);
  const commands: Array<Command> = parseCommands(lines);
  const { fileTree } = executeCommands({ commands });
  const stats = dirStats(fileTree);

  let result = 0;
  for (const size of stats.values()) {
    if (size > sizeLimit) {
      continue;
    }

    result += size;
  }

  return result;
}
