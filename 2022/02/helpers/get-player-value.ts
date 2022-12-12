import { opponentGameValue } from '../constants/opponent-game-value';
import { playerGameResult } from '../constants/player-game-result';
import type { GamePair, GameValue } from '../types';

export function getPlayerValue({ player, opponent }: GamePair): GameValue {
  const playerResult = playerGameResult[player];
  const opponentValue = opponentGameValue[opponent];

  if (playerResult === 'Draw') {
    return opponentValue;
  }

  switch (opponentValue) {
    case 'Rock':
      return playerResult === 'Win' ? 'Paper' : 'Scissors';
    case 'Paper':
      return playerResult === 'Win' ? 'Scissors' : 'Rock';
    case 'Scissors':
      return playerResult === 'Win' ? 'Rock' : 'Paper';
  }
}
