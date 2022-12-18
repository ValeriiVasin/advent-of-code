import type { Grid } from '../types';
import { getMaxHeightsGrid } from './get-max-heights-grid';
import { isVisible } from './is-visible';

const grid: Grid<number> = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];
const maxHeightsGrid = getMaxHeightsGrid(grid);

test.each([
  [1, 1, true],
  [1, 2, true],
  [1, 3, false],
  [2, 1, true],
  [2, 2, false],
  [2, 3, true],
  [3, 2, true],
  [3, 1, false],
  [3, 3, false],
])('grid[%s][%s]', (i, j, expected) => {
  expect(isVisible({ grid, maxHeightsGrid, i, j })).toBe(expected);
});
