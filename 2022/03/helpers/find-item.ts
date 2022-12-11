export function findItem(str: string): string {
  const mid = Math.floor(str.length / 2);
  const visited = new Set<string>();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (i < mid) {
      visited.add(char);
      continue;
    }

    if (visited.has(char)) {
      return char;
    }
  }

  throw new Error(`Common item not found: "${str}"`);
}
