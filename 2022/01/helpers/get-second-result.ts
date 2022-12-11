import { sum } from '../../helpers/sum';
import { parseInput } from './parse-input';
import { readFixture } from './read-fixture';

function desc(a: number, b: number): number {
  return b - a;
}

export function getSecondResult(fixture: string): number {
  return sum(parseInput(readFixture(fixture)).map(sum).sort(desc).slice(0, 3));
}
