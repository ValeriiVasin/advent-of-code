interface MirrorGridIndexProps {
  i: number;
  j: number;
  iLength: number;
  jLength: number;
}

export function mirrorGridIndex({
  i,
  j,
  iLength,
  jLength,
}: MirrorGridIndexProps): { i: number; j: number } {
  return { i: iLength - i - 1, j: jLength - j - 1 };
}
