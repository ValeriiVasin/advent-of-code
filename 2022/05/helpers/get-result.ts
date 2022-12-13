import fs from 'fs';
import path from 'path';
import type { Options } from '../types';
import { moveCrates } from './move-crates';
import { parseInput } from './parse-input';
import { stacksToString } from './stacks-to-string';

export function getResult(fixture: string, options?: Options): string {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );

  const { commands, stacks } = parseInput(content);

  return stacksToString(moveCrates(stacks, commands, options));
}
