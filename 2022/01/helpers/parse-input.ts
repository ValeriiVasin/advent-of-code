import { EOL } from 'os';

export function parseInput(content: string): Array<Array<number>> {
  const result: Array<Array<number>> = [];
  let subResult = [];
  for (const line of content.trim().split(EOL)) {
    if (line === '') {
      result.push(subResult);
      subResult = [];
      continue;
    }

    const value = Number(line.trim());

    if (!Number.isFinite(value)) {
      throw new Error('Input is invalid.');
    }

    subResult.push(value);
  }

  result.push(subResult);

  return result;
}
