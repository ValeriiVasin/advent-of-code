import { configure } from '../5/lib';

export enum Tile {
  Empty,
  Wall,
  Block,
  Paddle,
  Ball,
}

interface Point {
  x: number;
  y: number;
}

const toString = ({ x, y }: Point) => `(${x},${y})`;

export async function game(program: number[]) {
  const input: number[] = [];
  const output: number[] = [];
  const software = configure({ program, input, output });

  await software.start();

  const screen = new Map<string, Tile>();
  while (output.length > 2) {
    const [x, y, tile]: [number, number, Tile] = [
      output.shift(),
      output.shift(),
      output.shift(),
    ];

    screen.set(toString({ x, y }), tile);
  }

  let count = 0;
  for (let tile of screen.values()) {
    if (tile === Tile.Block) {
      count++;
    }
  }

  return count;
}
