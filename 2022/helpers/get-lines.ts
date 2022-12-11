import { EOL } from 'os';

export function getLines(content: string): Array<string> {
  return content
    .trim()
    .split(EOL)
    .map((line) => line.trim());
}
