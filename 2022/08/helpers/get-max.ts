import type { Grid, MaxHeight } from '../types';

interface GetMaxProps {
  maxHeightsGrid: Grid<MaxHeight>;
  i: number;
  j: number;
  side: keyof MaxHeight;
}
export function getMax({ maxHeightsGrid: grid, i, j, side }: GetMaxProps) {
  switch (side) {
    case 'left':
      return grid[i]?.[j - 1]?.left ?? -Infinity;
    case 'right':
      return grid[i]?.[j + 1]?.right ?? -Infinity;
    case 'top':
      return grid[i - 1]?.[j]?.top ?? -Infinity;
    case 'bottom':
      return grid[i + 1]?.[j]?.bottom ?? -Infinity;
  }
}
