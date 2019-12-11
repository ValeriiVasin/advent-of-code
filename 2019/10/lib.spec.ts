import {
  findEquation,
  Point,
  equationToString,
  findLines,
  parseInput,
  countViewableAsteroids,
  findBestAsteroid,
  prepareVaporization,
  vaporize,
} from './lib';
import { one, two, three, four, five, six } from './fixtures';

describe('find equation', () => {
  it('#1', () => {
    const a: Point = { x: 0, y: 1 };
    const b: Point = { x: 2, y: 0 };

    expect(findEquation(a, b)).toEqual({ k: -0.5, b: 1 });
  });

  it('#2', () => {
    const a: Point = { x: 0, y: 0 };
    const b: Point = { x: 1, y: 1 };

    expect(findEquation(a, b)).toEqual({ k: 1, b: 0 });
  });

  it('vertical', () => {
    const a: Point = { x: 0, y: 0 };
    const b: Point = { x: 0, y: 5 };

    expect(findEquation(a, b)).toEqual({ x: 0 });
  });

  it('horizontal', () => {
    const a: Point = { x: 0, y: 0 };
    const b: Point = { x: 5, y: 0 };

    expect(findEquation(a, b)).toEqual({ k: 0, b: 0 });
  });
});

describe('equation to string', () => {
  it('vertical: x=5', () => {
    expect(equationToString({ x: 5 })).toBe('x=5');
  });

  it('horizontal: y=5', () => {
    expect(equationToString({ k: 0, b: 5 })).toBe('y=5');
  });

  it('without b: y=5x', () => {
    expect(equationToString({ k: 5, b: 0 })).toBe('y=5x');
  });

  it('k=1', () => {
    expect(equationToString({ k: 1, b: 0 })).toBe('y=x');
    expect(equationToString({ k: 1, b: 1 })).toBe('y=x+1');
  });

  it('b<0', () => {
    expect(equationToString({ k: 1, b: -3 })).toBe('y=x-3');
  });

  it('full: y=5x+2', () => {
    expect(equationToString({ k: 5, b: 2 })).toBe('y=5x+2');
  });
});

describe('find lines', () => {
  const center: Point = { x: 0, y: 0 };
  const xAxis: Point = { x: 1, y: 0 };
  const yAxis: Point = { x: 0, y: 1 };
  const diagonal: Point = { x: 1, y: 1 };

  it('findes all lines', () => {
    const result = findLines(center, [xAxis, yAxis, diagonal]);
    expect(result.size).toBe(3);
    expect([...result.keys()]).toEqual(
      expect.arrayContaining(['x=0', 'y=0', 'y=x']),
    );

    expect(result.get('x=0')).toEqual(expect.arrayContaining([center, yAxis]));
    expect(result.get('y=0')).toEqual(expect.arrayContaining([center, xAxis]));
    expect(result.get('y=x')).toEqual(
      expect.arrayContaining([center, diagonal]),
    );
  });

  it('ignores same as center point', () => {
    expect(
      findLines(center, [center, center, center, yAxis]).get('x=0').length,
    ).toBe(2);
  });

  it('sorts points of each line', () => {
    expect(findLines(center, [yAxis]).get('x=0')).toEqual([center, yAxis]);
    expect(findLines(yAxis, [center]).get('x=0')).toEqual([center, yAxis]);

    expect(findLines(center, [xAxis]).get('y=0')).toEqual([center, xAxis]);
    expect(findLines(xAxis, [center]).get('y=0')).toEqual([center, xAxis]);
  });
});

describe('parsing input', () => {
  it('parses it correctly', () => {
    expect(parseInput(one)).toEqual(
      expect.arrayContaining([
        { x: 1, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
      ]),
    );
  });
});

describe('count viewable asteroids', () => {
  const points: Point[] = parseInput(one);

  it('#1', () => {
    const point = { x: 1, y: 0 };
    expect(countViewableAsteroids(point, points)).toBe(7);
  });

  it('#2', () => {
    const point = { x: 3, y: 4 };
    expect(countViewableAsteroids(point, points)).toBe(8);
  });
});

describe('find best asteroid', () => {
  it('#1', () => {
    const points = parseInput(one);
    expect(findBestAsteroid(points)).toEqual({
      point: { x: 3, y: 4 },
      viewable: 8,
    });
  });

  it('#2', () => {
    const points = parseInput(two);
    expect(findBestAsteroid(points)).toEqual({
      point: { x: 5, y: 8 },
      viewable: 33,
    });
  });

  it('#3', () => {
    const points = parseInput(three);
    expect(findBestAsteroid(points)).toEqual({
      point: { x: 1, y: 2 },
      viewable: 35,
    });
  });

  it('#4', () => {
    const points = parseInput(four);
    expect(findBestAsteroid(points)).toEqual({
      point: { x: 6, y: 3 },
      viewable: 41,
    });
  });

  it('#5', () => {
    const points = parseInput(five);
    expect(findBestAsteroid(points)).toEqual({
      point: { x: 11, y: 13 },
      viewable: 210,
    });
  });
});

describe.only('vaporization', () => {
  const laser: Point = { x: 0, y: 0 };
  const points: Point[] = [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ];

  it('prepare lines for vaporization', () => {
    expect(prepareVaporization(laser, points)).toEqual([
      [{ x: 0, y: -1 }],
      [{ x: 1, y: -1 }],
      [{ x: 1, y: 0 }],
      [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      [{ x: -1, y: 1 }],
      [{ x: -1, y: 0 }],
      [{ x: -1, y: -1 }],
    ]);
  });

  it('vaporization list', () => {
    expect(vaporize(laser, points)).toEqual([
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
    ]);
  });

  it('works for provided example #6', () => {
    const points = parseInput(six);
    const [laser] = parseInput(six, 'X');
    const asteroids = vaporize(laser, points);

    expect(asteroids[0]).toEqual({ x: 8, y: 1 });
    expect(asteroids[1]).toEqual({ x: 9, y: 0 });
    expect(asteroids[8]).toEqual({ x: 15, y: 1 });
  });

  it('works for provided example #5 with the station', () => {
    const points = parseInput(five);
    const laser: Point = { x: 11, y: 13 };
    const asteroids = vaporize(laser, points);

    expect(asteroids[0]).toEqual({ x: 11, y: 12 });
    expect(asteroids[1]).toEqual({ x: 12, y: 1 });
    expect(asteroids[2]).toEqual({ x: 12, y: 2 });
    expect(asteroids[9]).toEqual({ x: 12, y: 8 });
    expect(asteroids[19]).toEqual({ x: 16, y: 0 });
    expect(asteroids[49]).toEqual({ x: 16, y: 9 });
    expect(asteroids[99]).toEqual({ x: 10, y: 16 });
    expect(asteroids[198]).toEqual({ x: 9, y: 6 });
    expect(asteroids[199]).toEqual({ x: 8, y: 2 });
    expect(asteroids[200]).toEqual({ x: 10, y: 9 });
    expect(asteroids[298]).toEqual({ x: 11, y: 1 });
  });
});
