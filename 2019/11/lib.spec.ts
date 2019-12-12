import {
  turnTo,
  Turn,
  Direction,
  move,
  Point,
  Color,
  robot,
  operate,
} from './lib';
import { Operation } from '../5/lib';

describe('turn', () => {
  it('works', () => {
    expect(turnTo(Direction.Up, Turn.Left)).toBe(Direction.Left);
    expect(turnTo(Direction.Up, Turn.Right)).toBe(Direction.Right);

    expect(turnTo(Direction.Right, Turn.Left)).toBe(Direction.Up);
    expect(turnTo(Direction.Right, Turn.Right)).toBe(Direction.Down);

    expect(turnTo(Direction.Down, Turn.Left)).toBe(Direction.Right);
    expect(turnTo(Direction.Down, Turn.Right)).toBe(Direction.Left);

    expect(turnTo(Direction.Left, Turn.Left)).toBe(Direction.Down);
    expect(turnTo(Direction.Left, Turn.Right)).toBe(Direction.Up);
  });
});

describe('move', () => {
  const point: Point = { x: 0, y: 0 };

  it('up', () => {
    expect(move({ point, direction: Direction.Up })).toEqual({ x: 0, y: 1 });
    expect(move({ point, direction: Direction.Up, steps: 2 })).toEqual({
      x: 0,
      y: 2,
    });
  });

  it('down', () => {
    expect(move({ point, direction: Direction.Down })).toEqual({ x: 0, y: -1 });
    expect(move({ point, direction: Direction.Down, steps: 2 })).toEqual({
      x: 0,
      y: -2,
    });
  });

  it('left', () => {
    expect(move({ point, direction: Direction.Left })).toEqual({ x: -1, y: 0 });
    expect(move({ point, direction: Direction.Left, steps: 2 })).toEqual({
      x: -2,
      y: 0,
    });
  });

  it('right', () => {
    expect(move({ point, direction: Direction.Right })).toEqual({ x: 1, y: 0 });
    expect(move({ point, direction: Direction.Right, steps: 2 })).toEqual({
      x: 2,
      y: 0,
    });
  });
});

describe('robot', () => {
  it('circles to the right', () => {
    const painted: Map<string, Color> = new Map();
    const r2d2 = robot(painted, { x: 0, y: 0 }, Direction.Up);
    r2d2.execute({ color: Color.White, turn: Turn.Right });
    r2d2.execute({ color: Color.White, turn: Turn.Right });
    r2d2.execute({ color: Color.White, turn: Turn.Right });
    r2d2.execute({ color: Color.White, turn: Turn.Right });

    expect([...painted.keys()]).toEqual(['(0,0)', '(1,0)', '(1,-1)', '(0,-1)']);
    expect([...painted.values()]).toEqual([
      Color.White,
      Color.White,
      Color.White,
      Color.White,
    ]);
  });
});

describe('operator', () => {
  const DIRECT_OUTPUT = 104;
  const program: number[] = [
    DIRECT_OUTPUT,
    Color.White,
    DIRECT_OUTPUT,
    Turn.Right,
    DIRECT_OUTPUT,
    Color.White,
    DIRECT_OUTPUT,
    Turn.Right,
    Operation.Exit,
  ];

  it('operates robot', async () => {
    const painted = await operate(program);
    expect([...painted.keys()]).toEqual(['(0,0)', '(1,0)']);
    expect([...painted.values()]).toEqual([Color.White, Color.White]);
    expect.assertions(2);
  });
});
