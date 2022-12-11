import fs from 'fs';
import path from 'path';

export function readFixture(fixture: string): string {
  return fs.readFileSync(path.resolve(__dirname, `../fixtures/${fixture}`), {
    encoding: 'utf8',
  });
}
