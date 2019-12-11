export interface Point {
  x: number;
  y: number;
}

export type Line = [Point, Point];

export type Equation = { x: number } | { k: number; b: number };

function isVertical(eq: Equation): eq is { x: number } {
  return eq.hasOwnProperty('x');
}

const kx = (k: number) => {
  if (k === 0) {
    return '';
  }

  if (k === 1) {
    return 'x';
  }

  return `${k}x`;
};

const b = (b: number): string => {
  if (b === 0) {
    return '';
  }

  return b > 0 ? `+${b}` : String(b);
};

export const equationToString = (eq: Equation) => {
  if (isVertical(eq)) {
    return `x=${eq.x}`;
  }

  if (eq.k === 0) {
    return `y=${eq.b}`;
  }

  return `y=${kx(eq.k)}${b(eq.b)}`;
};

// https://matematikalegko.ru/koordinatnaya-ploskost/uglovoj-koefficient-pryamoj-i-ne-tolko.html
export const findEquation = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point,
): { k: number; b: number } | { x: number } => {
  if (x1 === x2) {
    return { x: x1 };
  }

  // y = kx + b;
  // y = (x - x1) * (y2 - y1) / (x2 - x1) + y1;
  const c1 = (y2 - y1) / (x2 - x1);
  // y = (x - x1) * c1 + y1
  // y = c1 * x - c1 * x1 + y1
  const k = c1;
  const b = y1 - c1 * x1;

  return { k, b };
};

export const findLines = (
  point: Point,
  points: Point[],
): Map<string, Point[]> => {
  const map = new Map<string, Point[]>();

  for (let p of points) {
    if (p.x === point.x && p.y === point.y) {
      continue;
    }

    const equation = findEquation(point, p);
    const stringified = equationToString(equation);
    if (!map.has(stringified)) {
      map.set(stringified, [point, p]);
      continue;
    }

    map.get(stringified).push(p);
  }

  const compare = (a: number, b: number) => a - b;
  for (let linePoints of map.values()) {
    linePoints.sort((a: Point, b: Point) => {
      if (a.x === b.x && a.y === b.y) {
        return 0;
      }

      if (a.x === b.x) {
        return compare(a.y, b.y);
      }

      return compare(a.x, b.x);
    });
  }

  return map;
};

export const parseInput = (input: string): Point[] => {
  const lines = input.trim().split('\n');
  const points: Point[] = [];

  for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.split('').entries()) {
      if (char === '#') {
        points.push({ x, y });
      }
    }
  }

  return points;
};

const viewableAsteroids = (point: Point, line: Point[]) => {
  // line from 2 points = all visible
  if (line.length < 3) {
    return 1;
  }

  const index = line.findIndex(p => p.x == point.x && p.y === point.y);

  if (index === 0) {
    return 1;
  }

  if (index === line.length - 1) {
    return 1;
  }

  return 2;
};

export const countViewableAsteroids = (
  point: Point,
  points: Point[],
): number => {
  const lines = findLines(point, points);
  let visible = 0;

  for (const line of lines.values()) {
    visible += viewableAsteroids(point, line);
  }

  return visible;
};

export const findBestAsteroid = (
  points: Point[],
): { point: Point; viewable: number } => {
  let maxCount = -Infinity;
  let maxPoint: Point;

  for (let point of points) {
    const count = countViewableAsteroids(point, points);
    if (count > maxCount) {
      maxCount = count;
      maxPoint = point;
    }
  }

  return { point: maxPoint, viewable: maxCount };
};
