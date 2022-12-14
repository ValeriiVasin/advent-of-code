import fs from 'fs';
import path from 'path';
import { findMarker } from './find-marker';

export function getResult(fixture: string): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );

  return findMarker(content.trim());
}
