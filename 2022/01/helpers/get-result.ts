import { parseInput } from './parse-input';
import { readFixture } from './read-fixture';
import { sum } from './sum';

export function getResult(fixture: string): number {
  return Math.max(...parseInput(readFixture(fixture)).map(sum));
}
