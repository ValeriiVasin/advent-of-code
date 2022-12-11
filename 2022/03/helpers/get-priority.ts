function isLowerCased(char: string): boolean {
  return char.toLowerCase() === char;
}

const lowerACode = 97;
const upperACode = 65;
export function getPriority(char: string): number {
  const charCode = char.charCodeAt(0);
  return isLowerCased(char)
    ? charCode - lowerACode + 1
    : charCode - upperACode + 1 + 26;
}
