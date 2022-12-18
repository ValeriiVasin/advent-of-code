import type { Grid, MaxHeight } from '../types';
import { mirrorGridIndex } from './mirror-grid-index';

export function maxHeightMap(heights: Grid<number>): Grid<MaxHeight> {
  const result = initialize(heights);
  const iLength = heights.length;
  const jLength = heights[0]?.length ?? 0;

  for (let i = 0; i < iLength; i++) {
    for (let j = 0; j < jLength; j++) {
      const value = heights[i][j];
      result[i][j].left = Math.max(
        value,
        getMax({ result, i, j, side: 'left' }),
      );
      result[i][j].top = Math.max(value, getMax({ result, i, j, side: 'top' }));

      const { i: iMirror, j: jMirror } = mirrorGridIndex({
        i,
        j,
        iLength,
        jLength,
      });
      const valueMirror = heights[iMirror][jMirror];
      result[iMirror][jMirror].right = Math.max(
        valueMirror,
        getMax({ result, i: iMirror, j: jMirror, side: 'right' }),
      );
      result[iMirror][jMirror].bottom = Math.max(
        valueMirror,
        getMax({ result, i: iMirror, j: jMirror, side: 'bottom' }),
      );
    }
  }

  return result;
}

function initialize(heights: Grid<number>): Grid<MaxHeight> {
  return heights.map((row) => row.map(initialValue));
}

const initialValue = (): MaxHeight => ({
  top: -Infinity,
  right: -Infinity,
  bottom: -Infinity,
  left: -Infinity,
});

interface GetMaxProps {
  result: Grid<MaxHeight>;
  i: number;
  j: number;
  side: keyof MaxHeight;
}
function getMax({ result, i, j, side }: GetMaxProps) {
  switch (side) {
    case 'left':
      return result[i]?.[j - 1]?.left ?? -Infinity;
    case 'right':
      return result[i]?.[j + 1]?.right ?? -Infinity;
    case 'top':
      return result[i - 1]?.[j]?.top ?? -Infinity;
    case 'bottom':
      return result[i + 1]?.[j]?.bottom ?? -Infinity;
  }
}
