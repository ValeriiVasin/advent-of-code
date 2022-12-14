export function findMarker(str: string, size = 4): number {
  let result = -1;

  for (let i = 0; i < str.length - size; i++) {
    const windowStr = str.slice(i, i + size);
    const windowSet = new Set(windowStr);
    if (windowSet.size === size) {
      return i + size;
    }
  }

  return result;
}
