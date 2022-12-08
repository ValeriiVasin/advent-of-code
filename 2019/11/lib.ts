import { configure, timeout } from '../5/lib';

export type Point = { x: number; y: number };

export enum Color {
  Black,
  White,
}

export enum Turn {
  Left,
  Right,
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface RobotInstruction {
  color: Color;
  turn: Turn;
}

const pointToString = (point: Point) => `(${point.x},${point.y})`;

export const getColor = (painted: Map<string, Color>, point: Point): Color => {
  const key = pointToString(point);
  return painted.get(key) ?? Color.Black;
};

const setColor = (
  painted: Map<string, Color>,
  point: Point,
  color: Color,
): void => {
  painted.set(pointToString(point), color);
};

export const move = ({
  point,
  direction,
  steps = 1,
}: {
  point: Point;
  direction: Direction;
  steps?: number;
}): Point => {
  switch (direction) {
    case Direction.Up:
      return { ...point, y: point.y + steps };
    case Direction.Down:
      return { ...point, y: point.y - steps };
    case Direction.Left:
      return { ...point, x: point.x - steps };
    case Direction.Right:
      return { ...point, x: point.x + steps };
  }
};

export const turnTo = (current: Direction, to: Turn): Direction => {
  if (current === Direction.Up) {
    return to === Turn.Right ? Direction.Right : Direction.Left;
  }

  if (current === Direction.Right) {
    return to === Turn.Right ? Direction.Down : Direction.Up;
  }

  if (current === Direction.Down) {
    return to === Turn.Right ? Direction.Left : Direction.Right;
  }

  // Right
  return to === Turn.Right ? Direction.Up : Direction.Down;
};

export function robot(
  painted: Map<string, Color>,
  point: Point,
  direction = Direction.Up,
) {
  return {
    getColor: () => getColor(painted, point),
    execute: ({ color, turn }: { color: Color; turn: Turn }) => {
      setColor(painted, point, color);
      direction = turnTo(direction, turn);
      point = move({ point, direction });
    },
  };
}

export async function operate(
  program: number[],
  initialColor: Color = Color.Black,
): Promise<Map<string, Color>> {
  const painted = new Map();
  const start: Point = { x: 0, y: 0 };
  const r2d2 = robot(painted, start, Direction.Up);

  const input: number[] = [initialColor];
  const output: number[] = [];
  const software = configure({ program, input, output });

  software.start();

  const execute = () => {
    while (output.length >= 2) {
      const color: Color | undefined = output.shift();
      const turn: Turn | undefined = output.shift();

      if (!color || !turn) {
        continue;
      }

      r2d2.execute({ color, turn });
      input.push(r2d2.getColor());
    }
  };

  while (!software.isDone()) {
    await timeout(1);
    execute();
  }

  execute();

  return painted;
}
