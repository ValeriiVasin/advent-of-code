import { run } from '../5/lib';

enum Shape {
  Stationary,
  Pulled,
}

export const scan = async (
  program: number[],
  width: number,
  height: number,
): Promise<number> => {
  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const { output } = await run({ program: [...program], input: [x, y] });
      if (output[0] === Shape.Pulled) {
        count++;
      }
    }
  }

  return count;
};
