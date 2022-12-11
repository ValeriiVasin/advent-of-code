import fs from 'fs';
import path from 'path';
import { getLines } from '../../helpers/get-lines';
import { sum } from '../../helpers/sum';
import { findItem } from './find-item';
import { getPriority } from './get-priority';

export function getResult(fixture: string): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );

  return sum(getLines(content).map(findItem).map(getPriority));
}
