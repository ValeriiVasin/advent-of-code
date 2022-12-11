import { opponentGameValue } from '../constants/opponent-game-value';
import { playerGameValue } from '../constants/player-game-value';
import { GamePair, GameResult } from '../types';

export function getGameResult({ player, opponent }: GamePair): GameResult {
  const playerValue = playerGameValue[player];
  const opponentValue = opponentGameValue[opponent];

  if (playerValue === opponentValue) {
    return 'Draw';
  }

  switch (opponentValue) {
    case 'Rock':
      return playerValue === 'Paper' ? 'Win' : 'Lose';
    case 'Paper':
      return playerValue === 'Scissors' ? 'Win' : 'Lose';
    case 'Scissors':
      return playerValue === 'Rock' ? 'Win' : 'Lose';
  }
}
