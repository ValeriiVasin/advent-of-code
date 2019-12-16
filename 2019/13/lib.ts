import { configure, run, timeout } from '../5/lib';

let guess: number[] = [];

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

function getTileSymbol(tile: Tile) {
  switch (tile) {
    case Tile.Empty:
      return ' ';
    case Tile.Wall:
      return 'W';
    case Tile.Ball:
      return 'x';
    case Tile.Paddle:
      return '_';
    case Tile.Block:
      return 'B';
  }
}

const toString = ({ x, y }: Point) => `(${x},${y})`;
const toPoint = (str: string): Point => {
  const [x, y] = str
    .slice(1, -1)
    .split(',')
    .map(_ => Number(_));
  return { x, y };
};

function draw(screen: Map<string, Tile>) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let key of screen.keys()) {
    const [x, y] = key
      .slice(1, -1)
      .split(',')
      .map(_ => Number(_));
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  let result = [];
  for (let y = minY; y <= maxY; y++) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      const tile = screen.get(toString({ x, y }));
      line += getTileSymbol(tile);
    }
    result.push(line);
  }

  console.log(result.join('\n'));
}

export async function game(program: number[]) {
  const input: number[] = [];
  const output: number[] = [];
  const software = configure({ program, input, output });

  await software.start();
  const screen = new Map<string, Tile>();
  updateScreen(output, screen);

  return countBlocks(screen);
}

function updateScreen(
  output: number[],
  screen: Map<string, Tile>,
  score: number = 0,
): number {
  while (output.length > 2) {
    const [x, y, tile]: [number, number, Tile] = [
      output.shift(),
      output.shift(),
      output.shift(),
    ];

    if (x === -1 && y === 0) {
      score = tile;
      continue;
    }

    screen.set(toString({ x, y }), tile);
  }

  return score;
}

function countBlocks(screen: Map<string, Tile>): number {
  let count = 0;
  for (let tile of screen.values()) {
    if (tile === Tile.Block) {
      count++;
    }
  }

  return count;
}

export async function interactiveGame(program: number[]): Promise<number> {
  const getInteractiveProgram = () => [2, ...program.slice(1)];
  const get = () => {
    if (guess.length === 0) {
      return 0;
    }

    return guess.shift();
  };

  const { track, correction } = moveDebugger();

  let win = false;
  while (!win) {
    const copy = [];
    let score = 0;
    const input: number[] = [];
    const output: number[] = [];
    const software = configure({
      program: getInteractiveProgram(),
      input,
      output,
    });
    const screen = new Map();

    software.start();
    while (!software.isDone()) {
      await timeout(25);
      if (input.length === 0) {
        const v = get();
        copy.push(v);
        input.push(v);
      }
      score = updateScreen(output, screen, score);
      draw(screen);
      console.log('Score: ', score);
      console.log('Blocks:', countBlocks(screen));
      console.log(debug(copy));
      track(screen);
    }

    if (countBlocks(screen) === 0) {
      console.log('Winner!');
      win = true;
      continue;
    }

    guess = correction(copy);
    await timeout(1000);
  }

  return 0;
}

const debug = (input: number[]): string => {
  let prev = input[0];
  let count = 0;
  let result = '';

  for (let value of input) {
    if (value === prev) {
      count++;
      continue;
    }

    result += ` ${prev}x${count}`;
    count = 1;
    prev = value;
  }

  result += ` ${prev}x${count}`;

  return result;
};

function moveDebugger() {
  let trackpad: string[] = [];
  let ball: string[] = [];

  const reset = () => {
    trackpad = [];
    ball = [];
  };

  const track = (screen: Map<string, Tile>) => {
    for (let [k, v] of screen) {
      if (v === Tile.Paddle) {
        if (trackpad.length === 3) {
          trackpad.shift();
        }
        trackpad.push(k);
        continue;
      }

      if (v !== Tile.Ball) {
        continue;
      }

      if (ball.length === 3) {
        ball.shift();
      }

      ball.push(k);
    }

    console.log(`T: ${trackpad.join(' > ')}; B: ${ball.join(' > ')}`);
  };

  const correction = (input: number[]): number[] => {
    const trackpadPoint: Point = toPoint(trackpad[1]);
    const ballPoint: Point = toPoint(ball[1]);

    const diff = ballPoint.x - trackpadPoint.x;

    console.log('corrected from: ', input.length, debug(input));
    const corrected: number[] = [
      ...input.slice(0, input.length - 2 - Math.abs(diff)),
      ...Array(Math.abs(diff)).fill(diff > 0 ? 1 : -1),
    ];
    console.log('corrected to: ', corrected.length, debug(corrected));

    reset();
    return corrected;
  };

  return {
    track,
    correction,
  };
}
