enum Area {
  Scaffold = 35,
  Space = 46,
  NewLine = 10,
}

enum Chars {
  Scaffold = '#',
  Space = '.',
  NewLine = '\n',
}

const numberToChar = (value: number): string => {
  switch (value) {
    case Area.Scaffold:
      return Chars.Scaffold;
    case Area.Space:
      return Chars.Space;
    case Area.NewLine:
      return Chars.NewLine;
  }

  return String.fromCharCode(value);
};

const charToNumber = (value: string): number => {
  switch (value) {
    case Chars.Scaffold:
      return Area.Scaffold;
    case Chars.Space:
      return Area.Space;
    case Chars.NewLine:
      return Area.NewLine;
  }

  return value.charCodeAt(0);
};

export const outputToString = (output: number[]): string =>
  output.map(numberToChar).join('');

export const pictureToOutput = (picture: string): number[] =>
  picture.split('').map(charToNumber);

export const outputToArray = (output: number[]): Array<number[]> => {
  const result: Array<number[]> = [];
  let line: number[] = [];

  for (let value of output) {
    if (value === Area.NewLine) {
      result.push(line);
      line = [];
      continue;
    }

    line.push(value);
  }

  if (line.length > 0) {
    result.push(line);
  }

  return result;
};

const isScaffold = (value: number): boolean =>
  value !== Area.NewLine && value !== Area.Space;

const isIntersection = (
  nums: Array<number[]>,
  { x, y }: { x: number; y: number },
): boolean => {
  return (
    isScaffold(nums[y][x]) &&
    isScaffold(nums[y - 1][x]) &&
    isScaffold(nums[y + 1][x]) &&
    isScaffold(nums[y][x - 1]) &&
    isScaffold(nums[y][x + 1])
  );
};

export const findIntersections = (
  nums: Array<number[]>,
): Array<{ x: number; y: number }> => {
  const result: Array<{ x: number; y: number }> = [];

  for (let y = 1; y < nums.length - 1; y++) {
    for (let x = 1; x < nums[0].length - 1; x++) {
      if (isIntersection(nums, { x, y })) {
        result.push({ x, y });
      }
    }
  }

  return result;
};

export const calibrate = (
  intersections: Array<{ x: number; y: number }>,
): number => intersections.reduce((acc, { x, y }) => acc + x * y, 0);

const findRobot = (output: number[]): { x: number; y: number } => {
  const arr = outputToArray(output);

  for (let [y, line] of arr.entries()) {
    for (let [x, value] of line.entries()) {
      if (value === Area.Scaffold) {
        continue;
      }

      if (value === Area.Space) {
        continue;
      }

      return { x, y };
    }
  }

  return { x: 0, y: 0 };
};

enum Rotation {
  Left = 'L',
  Right = 'R',
}

enum Direction {
  Left = 60,
  Right = 62,
  Up = 94,
  Down = 118,
}

const rotate = (direction: Direction, rotation: Rotation): Direction => {
  switch (direction) {
    case Direction.Up:
      return rotation === Rotation.Left ? Direction.Left : Direction.Right;
    case Direction.Right:
      return rotation === Rotation.Left ? Direction.Up : Direction.Down;
    case Direction.Down:
      return rotation === Rotation.Left ? Direction.Right : Direction.Left;
    case Direction.Left:
      return rotation === Rotation.Left ? Direction.Down : Direction.Up;
  }
};

const getDimensions = (output: number[]): { width: number; height: number } => {
  const width = output.indexOf(Area.NewLine);
  const height = output.length / (width + 1);

  return { width, height };
};

const getOutputIndex = (
  output: number[],
  { x, y }: { x: number; y: number },
): number => {
  const { width } = getDimensions(output);

  return y * (width + 1) + x;
};

const movement = (
  steps: number,
  direction: Direction,
  { x, y }: { x: number; y: number },
): { x: number; y: number } => {
  switch (direction) {
    case Direction.Up:
      return { x, y: y - steps };
    case Direction.Down:
      return { x, y: y + steps };
    case Direction.Right:
      return { x: x + steps, y };
    case Direction.Left:
      return { x: x - steps, y };
  }
};

export const move = (output: number[], char: string): number[] => {
  const result = [...output];
  const { x, y } = findRobot(output);
  const abs = getOutputIndex(output, { x, y });
  const direction: Direction = output[abs];

  if (char === 'L') {
    result[abs] = rotate(direction, Rotation.Left);
    return result;
  }

  if (char === 'R') {
    result[abs] = rotate(direction, Rotation.Right);
    return result;
  }

  if (/^\d+$/.test(char)) {
    const steps = Number(char);
    const nextPosition = movement(steps, direction, { x, y });
    result[abs] = Area.Scaffold;
    result[getOutputIndex(result, nextPosition)] = direction;

    return result;
  }

  return result;
};
