import { sum } from '../../helpers/sum';
import { parseInput } from './parse-input';
import { readFixture } from './read-fixture';

export function getResult(fixture: string): number {
  return Math.max(...parseInput(readFixture(fixture)).map(sum));
}
