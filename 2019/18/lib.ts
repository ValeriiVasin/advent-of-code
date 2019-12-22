export enum Block {
  Empty = '.',
  Wall = '#',
  Entrance = '@',
}

interface Point {
  x: number;
  y: number;
}

export const isKey = (char: string) => /[a-z]/.test(char);
export const isDoor = (char: string) => /[A-Z]/.test(char);
export const isEntrance = (char: string) => char === Block.Entrance;
export const isWall = (char: string) => char === Block.Wall;

export const parse = (picture: string): Array<string[]> =>
  picture.split('\n').map(line => line.split(''));

export const findItem = (map: Array<string[]>, item: string): Point => {
  for (let [y, line] of map.entries()) {
    for (let [x, char] of line.entries()) {
      if (char === item) {
        return { x, y };
      }
    }
  }
};

const pointToString = (point: Point): string => `${point.x};${point.y}`;

export const findKeys = (
  map: Array<string[]>,
  point: Point,
  keys: Set<string> = new Set(),
  used: Set<string> = new Set(),
): Array<[string, number]> => {
  const result: Array<[string, number]> = [];

  let steps = 0;
  let coords: Array<Point> = [point];
  while (coords.length) {
    const next: Array<Point> = [];

    for (let { x, y } of coords) {
      const key = pointToString({ x, y });

      if (used.has(key)) {
        continue;
      }

      used.add(key);

      const value = map[y][x];

      if (isWall(value)) {
        continue;
      }

      if (isKey(value) && !keys.has(value)) {
        result.push([value, steps]);
        continue;
      }

      if (isDoor(value) && !keys.has(value.toLowerCase())) {
        continue;
      }

      next.push(...neighbours(map, { x, y }));
    }

    steps++;
    coords = next;
  }

  return result;
};

export const neighbours = function*(
  map: Array<string[]>,
  { x, y }: Point,
): Generator<Point, void> {
  const up = map[y - 1]?.[x] ?? Block.Wall;

  if (up !== Block.Wall) {
    yield { x, y: y - 1 };
  }

  const down = map[y + 1]?.[x] ?? Block.Wall;
  if (down !== Block.Wall) {
    yield { x, y: y + 1 };
  }

  const left = map[y][x - 1] ?? Block.Wall;
  if (left !== Block.Wall) {
    yield { x: x - 1, y };
  }

  const right = map[y][x + 1] ?? Block.Wall;
  if (right !== Block.Wall) {
    yield { x: x + 1, y };
  }
};

export const getKeysMap = (map: Array<string[]>): Map<string, Point> => {
  const result = new Map<string, Point>();

  for (let [y, line] of map.entries()) {
    for (let [x, value] of line.entries()) {
      if (isKey(value)) {
        result.set(value, { x, y });
      }
    }
  }

  return result;
};

const gameStep = ({
  map,
  steps,
  keysMap,
  point,
  result,
  minResult,
}: {
  map: Array<string[]>;
  steps: number;
  keysMap: Map<string, Point>;
  point: Point;
  result: Set<string>;
  minResult: { steps: number; keys: Set<string> };
}): { steps: number; keys: Set<string> } => {
  if (result.size === keysMap.size && steps >= minResult.steps) {
    return minResult;
  }

  if (result.size === keysMap.size) {
    return { steps, keys: new Set(result) };
  }

  if (steps >= minResult.steps) {
    return minResult;
  }

  for (let [key, stepsToKey] of findKeys(map, point, result)) {
    result.add(key);
    minResult = gameStep({
      map,
      keysMap,
      steps: steps + stepsToKey,
      point: keysMap.get(key),
      result,
      minResult,
    });
    result.delete(key);
  }

  return minResult;
};

export const game = (
  map: Array<string[]>,
): { keys: string[]; steps: number } => {
  const min = gameStep({
    map,
    steps: 0,
    keysMap: getKeysMap(map),
    point: findItem(map, Block.Entrance),
    result: new Set(),
    minResult: { steps: Infinity, keys: new Set() },
  });

  return {
    steps: min.steps,
    keys: [...min.keys],
  };
};
