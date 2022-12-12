import type { GameResult, PlayerValue } from '../types';

export const playerGameResult: Record<PlayerValue, GameResult> = {
  X: 'Lose',
  Y: 'Draw',
  Z: 'Win',
};
