export const parseInput = (str: string): number[] =>
  str.split('').map(_ => Number(_));

function* createPattern({
  pattern,
  repeat,
  length,
}: {
  pattern: number[];
  repeat: number;
  length: number;
}) {
  let skipped = false;

  while (true) {
    for (let value of pattern) {
      for (let i = 0; i < repeat; i++) {
        if (!skipped) {
          skipped = true;
          continue;
        }

        yield value;
        length--;
        if (length === 0) {
          return;
        }
      }
    }
  }
}

export const getPattern = ({
  length,
  repeat,
}: {
  length: number;
  repeat: number;
}): number[] => [...createPattern({ pattern: [0, 1, 0, -1], repeat, length })];

export const fft = function(str: string, phases: number = 1): string {
  const length = str.length;
  let input = parseInput(str);

  for (let phase = 0; phase < phases; phase++) {
    const output: number[] = [];

    for (let element = 0; element < length; element++) {
      const repeat = element + 1;
      const pattern = getPattern({ length, repeat });
      let sum = 0;
      for (let i = 0; i < length; i++) {
        const value = input[i];
        const pValue = pattern[i];
        sum += value * pValue;
      }

      output.push(Math.abs(sum) % 10);
    }

    input = output;
  }

  return input.join('');
};
