export interface Point {
  x: number;
  y: number;
}
export type Line = [Point, Point];

export const toDiff = (str: string): Point => {
  const direction = str.charAt(0);
  const value = Number(str.slice(1));

  switch (direction) {
    case 'R':
      return { x: value, y: 0 };
    case 'L':
      return { x: -value, y: 0 };
    case 'U':
      return { x: 0, y: value };
    case 'D':
      return { x: 0, y: -value };
  }
};

export const toPath = (wire: string): Point[] => {
  const moves = wire.split(',');
  let current = { x: 0, y: 0 };
  const path: Point[] = [current];

  for (let move of moves) {
    const diff = toDiff(move);
    current = { x: current.x + diff.x, y: current.y + diff.y };
    path.push(current);
  }

  return path;
};

export function toLines(wire: string): Line[] {
  const paths = toPath(wire);
  const lines: Line[] = [];

  for (let i = 0; i < paths.length - 1; i++) {
    lines.push([paths[i], paths[i + 1]]);
  }

  return lines;
}

export const distanceTo = ({ x, y }: Point) => Math.abs(x) + Math.abs(y);

export const isVerticalLine = ([start, end]: Line) => start.x === end.x;

export const isHorizontalLine = ([start, end]: Line) => start.y === end.y;

export const isParallel = (lineOne: Line, lineTwo: Line) => {
  if (isHorizontalLine(lineOne) && isHorizontalLine(lineTwo)) {
    return true;
  }

  if (isVerticalLine(lineOne) && isVerticalLine(lineTwo)) {
    return true;
  }

  return false;
};

const between = (value: number, a: number, b: number): boolean => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return value >= min && value <= max;
};

export const isPointOnLine = (point: Point, [start, end]: Line) => {
  return isVerticalLine([start, end])
    ? point.x === start.x && between(point.y, start.y, end.y)
    : point.y === start.y && between(point.x, start.x, end.x);
};

export const findCrossingPoint = (lineOne: Line, lineTwo: Line) => {
  if (isParallel(lineOne, lineTwo)) {
    return null;
  }

  const isFirstVertical = isVerticalLine(lineOne);
  const vertical = isFirstVertical ? lineOne : lineTwo;
  const horizontal = lineOne === vertical ? lineTwo : lineOne;
  const point = { x: vertical[0].x, y: horizontal[0].y };

  return isPointOnLine(point, lineOne) && isPointOnLine(point, lineTwo)
    ? point
    : null;
};

export function solution(wireOne: string, wireTwo: string): number {
  const crossingPoints = [];
  const linesOne = toLines(wireOne);
  const linesTwo = toLines(wireTwo);

  for (const lineOne of linesOne) {
    for (const lineTwo of linesTwo) {
      const point = findCrossingPoint(lineOne, lineTwo);

      if (point) {
        crossingPoints.push(point);
      }
    }
  }

  return Math.min(
    ...crossingPoints
      .map(point => distanceTo(point))
      .filter(distance => distance > 0),
  );
}

function lineLength([start, end]: Line): number {
  return isVerticalLine([start, end])
    ? Math.abs(start.y - end.y)
    : Math.abs(start.x - end.x);
}

const pointToString = (point: Point) => `${point.x};${point.y}`;

export function secondSolution(wireOne: string, wireTwo: string): number {
  const linesOne = toLines(wireOne);
  const linesTwo = toLines(wireTwo);
  const points = [];

  let wireOneDistance = 0;
  const wireOneDistances = new Map();
  const wireTwoDistances = new Map();
  for (const lineOne of linesOne) {
    let wireTwoDistance = 0;
    for (const lineTwo of linesTwo) {
      const point = findCrossingPoint(lineOne, lineTwo);

      if (!point) {
        wireTwoDistance += lineLength(lineTwo);
        continue;
      }

      points.push(point);
      const key = pointToString(point);

      if (!wireOneDistances.has(key)) {
        const [start] = lineOne;
        wireOneDistances.set(key, wireOneDistance + lineLength([start, point]));
      }

      if (!wireTwoDistances.has(key)) {
        const [start] = lineTwo;
        wireTwoDistances.set(key, wireTwoDistance + lineLength([start, point]));
      }

      wireTwoDistance += lineLength(lineTwo);
    }

    wireOneDistance += lineLength(lineOne);
  }

  let distance = Infinity;
  for (let point of points) {
    if (point.x === 0 && point.y === 0) {
      continue;
    }

    const key = pointToString(point);
    distance = Math.min(
      distance,
      wireOneDistances.get(key) + wireTwoDistances.get(key),
    );
  }

  return distance;
}
