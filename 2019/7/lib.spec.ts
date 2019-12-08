import { amplify, findMaxSignal, permutations } from './lib';
import { programOne, programTwo, programThree } from './fixtures';

describe('amplify', () => {
  it('#1', () => {
    expect(amplify(programOne, [4, 3, 2, 1, 0])).toBe(43210);
  });

  it('#2', () => {
    expect(amplify(programTwo, [0, 1, 2, 3, 4])).toBe(54321);
  });

  it('#3', () => {
    expect(amplify(programThree, [1, 0, 4, 3, 2])).toBe(65210);
  });
});

describe('permute', () => {
  it('permutes single value', () => {
    expect(permutations([1])).toEqual([[1]]);
  });

  it('permutes few values', () => {
    expect(permutations([1, 2])).toEqual([
      [1, 2],
      [2, 1],
    ]);
  });
});

describe('findMaxSignal', () => {
  it('#1', () => {
    expect(findMaxSignal(programOne)).toEqual({
      signal: 43210,
      phases: [4, 3, 2, 1, 0],
    });
  });

  it('#2', () => {
    expect(findMaxSignal(programTwo)).toEqual({
      signal: 54321,
      phases: [0, 1, 2, 3, 4],
    });
  });

  it('#3', () => {
    expect(findMaxSignal(programThree)).toEqual({
      signal: 65210,
      phases: [1, 0, 4, 3, 2],
    });
  });
});
