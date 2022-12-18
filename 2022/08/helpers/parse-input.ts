import { getLines } from '../../helpers/get-lines';
import type { Grid } from '../types';

export function parseInput(content: string): Grid<number> {
  return getLines(content).map((line) => line.split('').map(Number));
}
