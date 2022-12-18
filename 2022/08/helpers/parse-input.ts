import { getLines } from '../../helpers/get-lines';

export function parseInput(content: string): Array<Array<number>> {
  return getLines(content).map((line) => line.split('').map(Number));
}
