import { amplify, findMaxSignal, permutations, Mode } from './lib';
import {
  programOne,
  programTwo,
  programThree,
  programFour,
  programFive,
} from './fixtures';

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

describe('normal mode', () => {
  describe('amplify', () => {
    it('#1', async () => {
      await expect(amplify(programOne, [4, 3, 2, 1, 0])).resolves.toBe(43210);
    });

    it('#2', async () => {
      await expect(amplify(programTwo, [0, 1, 2, 3, 4])).resolves.toBe(54321);
    });

    it('#3', async () => {
      await expect(amplify(programThree, [1, 0, 4, 3, 2])).resolves.toBe(65210);
    });
  });

  describe('findMaxSignal', () => {
    it('#1', async () => {
      await expect(findMaxSignal(programOne)).resolves.toEqual({
        signal: 43210,
        phases: [4, 3, 2, 1, 0],
      });
    });

    it('#2', async () => {
      await expect(findMaxSignal(programTwo)).resolves.toEqual({
        signal: 54321,
        phases: [0, 1, 2, 3, 4],
      });
    });

    it('#3', async () => {
      await expect(findMaxSignal(programThree)).resolves.toEqual({
        signal: 65210,
        phases: [1, 0, 4, 3, 2],
      });
    });
  });
});

describe('feedback loop mode', () => {
  describe('amplify', () => {
    it('#4', async () => {
      await expect(
        amplify(programFour, [9, 8, 7, 6, 5], Mode.FeedbackLoop),
      ).resolves.toBe(139629729);
    });

    it('#5', async () => {
      await expect(
        amplify(programFive, [9, 7, 8, 5, 6], Mode.FeedbackLoop),
      ).resolves.toBe(18216);
    });
  });

  describe.skip('find max signal', () => {
    it('#4', async () => {
      await expect(
        findMaxSignal(programFour, Mode.FeedbackLoop),
      ).resolves.toEqual({
        signal: 139629729,
        phases: [9, 8, 7, 6, 5],
      });
    });

    it('#5', async () => {
      await expect(
        findMaxSignal(programFive, Mode.FeedbackLoop),
      ).resolves.toEqual({
        signal: 18216,
        phases: [9, 7, 8, 5, 6],
      });
    });
  });
});
