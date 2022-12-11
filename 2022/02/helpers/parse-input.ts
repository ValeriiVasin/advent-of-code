import { EOL } from 'os';
import { GamePair } from '../types';

const regexp = /^(?<opponent>[ABC]{1}) (?<player>[XYZ]{1})$/;

function isGamePair(group: unknown): group is GamePair {
  if (!group) {
    return false;
  }

  return (
    Object.prototype.hasOwnProperty.call(group, 'player') &&
    Object.prototype.hasOwnProperty.call(group, 'opponent')
  );
}

export function parseInput(input: string): Array<GamePair> {
  const lines = input
    .trim()
    .split(EOL)
    .map((line) => line.trim());

  const result: Array<GamePair> = [];
  for (const line of lines) {
    const gamePair = line.match(regexp)?.groups;

    if (!isGamePair(gamePair)) {
      throw new Error('Invalid input');
    }

    result.push(gamePair);
  }

  return result;
}
