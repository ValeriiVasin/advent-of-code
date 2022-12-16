import type { Directory, File } from '../types';

export function parseListOutput(
  output: Array<string>,
): Array<File | Directory> {
  return output.map(parseLine);
}

function isDirectoryPattern(
  match: RegExpMatchArray | null,
): match is RegExpMatchArray & { groups: { name: string } } {
  return Boolean(match);
}

function isFilePattern(
  match: RegExpMatchArray | null,
): match is RegExpMatchArray & { groups: { name: string; size: string } } {
  return Boolean(match);
}

const dirRegexp = /^dir (?<name>\w+)$/;
const fileRegexp = /^(?<size>\d+) (?<name>[\w\.\-]+)$/;
function parseLine(line: string): File | Directory {
  const dirMatch = line.match(dirRegexp);
  if (isDirectoryPattern(dirMatch)) {
    return { type: 'directory', name: dirMatch.groups.name };
  }

  const fileMatch = line.match(fileRegexp);
  if (isFilePattern(fileMatch)) {
    return {
      type: 'file',
      name: fileMatch.groups.name,
      size: Number(fileMatch.groups.size),
    };
  }

  throw new Error(`List output can not be parsed: "${line}"`);
}
