import { getLines } from '../../helpers/get-lines';
import type { IntervalTuple } from '../types';

function parseLine(line: string): IntervalTuple {
  return line.split(',').map((str) => {
    const [from, to] = str.split('-').map(Number);
    return { from, to };
  }) as IntervalTuple;
}

export function parseInput(content: string): Array<IntervalTuple> {
  return getLines(content).map(parseLine);
}
