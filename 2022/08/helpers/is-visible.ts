import type { Grid, MaxHeight } from '../types';
import { getMax } from './get-max';

interface IsVisibleProps {
  grid: Grid<number>;
  maxHeightsGrid: Grid<MaxHeight>;
  i: number;
  j: number;
}
export function isVisible({
  grid,
  maxHeightsGrid,
  i,
  j,
}: IsVisibleProps): boolean {
  return (
    grid[i][j] >
    Math.min(
      getMax({ maxHeightsGrid, i, j, side: 'left' }),
      getMax({ maxHeightsGrid, i, j, side: 'right' }),
      getMax({ maxHeightsGrid, i, j, side: 'bottom' }),
      getMax({ maxHeightsGrid, i, j, side: 'top' }),
    )
  );
}
