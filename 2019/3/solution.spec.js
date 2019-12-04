const {
  toDiff,
  toPath,
  toLines,
  distanceTo,
  isVerticalLine,
  isHorizontalLine,
  isParallel,
  findCrossingPoint,
  isPointOnLine,
  solution,
  secondSolution,
} = require('./solution');

describe('diff', () => {
  it('right', () => {
    expect(toDiff('R10')).toEqual({ x: 10, y: 0 });
  });

  it('left', () => {
    expect(toDiff('L10')).toEqual({ x: -10, y: 0 });
  });

  it('up', () => {
    expect(toDiff('U10')).toEqual({ x: 0, y: 10 });
  });

  it('down', () => {
    expect(toDiff('D10')).toEqual({ x: 0, y: -10 });
  });
});

describe('to path', () => {
  it('converts path', () => {
    expect(toPath('U10,R20')).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 10 },
      { x: 20, y: 10 },
    ]);
  });
});

describe('to lines', () => {
  it('converts wire to lines', () => {
    expect(toLines('U10,R20')).toEqual([
      [
        { x: 0, y: 0 },
        { x: 0, y: 10 },
      ],
      [
        { x: 0, y: 10 },
        { x: 20, y: 10 },
      ],
    ]);
  });
});

describe('distance from center', () => {
  it('positives', () => {
    expect(distanceTo({ x: 5, y: 3 })).toBe(8);
  });

  it('negatives', () => {
    expect(distanceTo({ x: -3, y: -4 })).toBe(7);
  });
});

describe('line', () => {
  const horizontal = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
  ];
  const vertical = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ];

  it('is vertical', () => {
    expect(isVerticalLine(vertical)).toBe(true);
    expect(isVerticalLine(horizontal)).toBe(false);
  });

  it('is horizontal', () => {
    expect(isHorizontalLine(horizontal)).toBe(true);
    expect(isHorizontalLine(vertical)).toBe(false);
  });

  it('is parallel', () => {
    expect(isParallel(horizontal, horizontal)).toBe(true);
    expect(isParallel(vertical, vertical)).toBe(true);
    expect(isParallel(horizontal, vertical)).toBe(false);
  });
});

describe('check point on line', () => {
  it('horizontal', () => {
    const left = { x: 0, y: 0 };
    const right = { x: 100, y: 0 };
    const line = [left, right];
    const yes = { x: 50, y: 0 };
    const no = { x: 5, y: 50 };

    expect(isPointOnLine(yes, line)).toBe(true);
    expect(isPointOnLine(no, line)).toBe(false);
    expect(isPointOnLine(left, line)).toBe(true);
    expect(isPointOnLine(right, line)).toBe(true);
    line.reverse();
    expect(isPointOnLine(yes, line)).toBe(true);
    expect(isPointOnLine(no, line)).toBe(false);
    expect(isPointOnLine(left, line)).toBe(true);
    expect(isPointOnLine(right, line)).toBe(true);
  });

  it('vertical', () => {
    const bottom = { x: 0, y: 0 };
    const top = { x: 0, y: 10 };
    const line = [bottom, top];
    const yes = { x: 0, y: 5 };
    const no = { x: 1, y: 5 };

    expect(isPointOnLine(yes, line)).toBe(true);
    expect(isPointOnLine(no, line)).toBe(false);
    expect(isPointOnLine(bottom, line)).toBe(true);
    expect(isPointOnLine(top, line)).toBe(true);
    line.reverse();
    expect(isPointOnLine(yes, line)).toBe(true);
    expect(isPointOnLine(no, line)).toBe(false);
    expect(isPointOnLine(bottom, line)).toBe(true);
    expect(isPointOnLine(top, line)).toBe(true);
  });
});

describe('find crossing point', () => {
  it('parallel', () => {
    const one = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
    const two = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    expect(findCrossingPoint(one, two)).toBeNull();
  });

  it('crossing', () => {
    const one = [
      { x: 0, y: 0 },
      { x: 0, y: 10 },
    ];
    const two = [
      { x: 1, y: 1 },
      { x: -1, y: 1 },
    ];
    expect(findCrossingPoint(one, two)).toEqual({ x: 0, y: 1 });
  });

  it('not parallel and not crossing', () => {
    const one = [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
    ];
    const two = [
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ];
    expect(findCrossingPoint(one, two)).toBeNull();
  });
});

describe('solution', () => {
  it('test #1', () => {
    expect(
      solution(
        'R75,D30,R83,U83,L12,D49,R71,U7,L72',
        'U62,R66,U55,R34,D71,R55,D58,R83',
      ),
    ).toBe(159);
  });

  it('test #2', () => {
    expect(
      solution(
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
        'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
      ),
    ).toBe(135);
  });
});

describe('second solution', () => {
  it('test #1', () => {
    expect(
      secondSolution(
        'R75,D30,R83,U83,L12,D49,R71,U7,L72',
        'U62,R66,U55,R34,D71,R55,D58,R83',
      ),
    ).toBe(610);
  });

  it('test #2', () => {
    expect(
      secondSolution(
        'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
        'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
      ),
    ).toBe(410);
  });
});
