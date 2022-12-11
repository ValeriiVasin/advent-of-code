import { sum } from '../../helpers/sum';
import { GameOptions } from '../types';
import { getScore } from './get-score';
import { parseInput } from './parse-input';
import { readFixture } from './read-fixture';

export function getResult(fixture: string, options?: GameOptions): number {
  return sum(
    parseInput(readFixture(fixture)).map((gamePair) =>
      getScore(gamePair, options),
    ),
  );
}
