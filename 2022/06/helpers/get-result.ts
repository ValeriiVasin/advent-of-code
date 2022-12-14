import fs from 'fs';
import path from 'path';
import { findMarker } from './find-marker';

interface Options {
  part: 'one' | 'two';
}

export function getResult(fixture: string, options?: Options): number {
  const content = fs
    .readFileSync(path.resolve(__dirname, `../fixtures/${fixture}`), {
      encoding: 'utf8',
    })
    .trim();
  const part = options?.part ?? 'one';

  return findMarker(content, part === 'one' ? 4 : 14);
}
