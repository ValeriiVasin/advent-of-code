import fs from 'fs';
import path from 'path';
import { isFullyContained } from './is-fully-contained';
import { overlapSize } from './overlap-size';
import { parseInput } from './parse-input';

interface Options {
  part: 'one' | 'two';
}

export function getResult(fixture: string, { part }: Options): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );

  return parseInput(content).filter((pair) =>
    part === 'one' ? isFullyContained(pair) : overlapSize(pair) > 0,
  ).length;
}
