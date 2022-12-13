import { EOL } from 'os';

type TrimType = 'lines' | 'content';

interface Options {
  trim: boolean | Record<TrimType, boolean>;
}

export function getLines(content: string, options?: Options): Array<string> {
  const { lines: trimLines, content: trimContent } = resolveTrimOption(
    options?.trim ?? true,
  );

  let lines = content.split(EOL);

  if (!trimLines && !trimContent) {
    return lines;
  }

  if (trimLines) {
    lines = lines.map((line) => line.trim());
  }

  return trimContent ? trimWhitespaceLines(lines) : lines;
}

function resolveTrimOption(trim: Options['trim']): Record<TrimType, boolean> {
  return typeof trim === 'boolean' ? { lines: trim, content: trim } : trim;
}

function trimWhitespaceLines(lines: Array<string>): Array<string> {
  const firstNotWhitespaceIndex = findFirstNotWhitespaceIndex(lines);

  if (firstNotWhitespaceIndex === -1) {
    return [];
  }

  const lastNotWhitespaceIndex =
    lines.length - findFirstNotWhitespaceIndex([...lines].reverse());
  return lines.slice(firstNotWhitespaceIndex, lastNotWhitespaceIndex);
}

function findFirstNotWhitespaceIndex(lines: Array<string>): number {
  return lines.findIndex((line) => line.length !== 0);
}
