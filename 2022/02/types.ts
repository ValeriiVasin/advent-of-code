export type GameValue = 'Rock' | 'Paper' | 'Scissors';
export type OpponentValue = 'A' | 'B' | 'C';
export type PlayerValue = 'X' | 'Y' | 'Z';
export type GameResult = 'Lose' | 'Win' | 'Draw';

export interface GamePair {
  player: PlayerValue;
  opponent: OpponentValue;
}

export interface GameOptions {
  adjusted: boolean;
}
