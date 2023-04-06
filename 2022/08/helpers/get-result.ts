import fs from 'fs';
import path from 'path';
import { getMaxHeightsGrid } from './get-max-heights-grid';
import { isVisible } from './is-visible';
import { parseInput } from './parse-input';

export function getResult(fixture: string): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );
  const grid = parseInput(content);
  const maxHeightsGrid = getMaxHeightsGrid(grid);

  let visibleCount = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (isVisible({ grid, maxHeightsGrid, i, j })) {
        visibleCount++;
      }
    }
  }

  return visibleCount;
}
