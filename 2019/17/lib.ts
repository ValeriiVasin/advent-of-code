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
