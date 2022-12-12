import { playerGameResult } from '../constants/player-game-result';
import { playerGameValue } from '../constants/player-game-value';
import { resultScore } from '../constants/result-score';
import { shapeScore } from '../constants/shape-score';
import type { GameOptions, GamePair } from '../types';
import { getGameResult } from './get-game-result';
import { getPlayerValue } from './get-player-value';

export function getScore(
  { player, opponent }: GamePair,
  options?: GameOptions,
): number {
  const adjusted = options?.adjusted ?? false;

  if (!adjusted) {
    return (
      shapeScore[playerGameValue[player]] +
      resultScore[getGameResult({ player, opponent })]
    );
  }

  return (
    shapeScore[getPlayerValue({ player, opponent })] +
    resultScore[playerGameResult[player]]
  );
}
