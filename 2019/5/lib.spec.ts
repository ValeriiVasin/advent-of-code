import { parseInstruction, run } from './lib';

describe('parsing instruction', () => {
  it('parses instructions', () => {
    expect(parseInstruction(99)).toEqual({
      code: 99,
      modes: [],
    });
  });

  it('leading zeros for modes', () => {
    expect(parseInstruction(1002)).toEqual({
      code: 2,
      modes: [0, 1, 0],
    });
  });
});

it('example #1', async () => {
  expect.assertions(1);
  const program = [1002, 4, 3, 4, 33];
  await run(program);
  expect(program).toEqual([1002, 4, 3, 4, 99]);
});

it('example #2', async () => {
  expect.assertions(1);
  const program = [1101, 100, -1, 4, 0];
  await run(program);
  expect(program).toEqual([1101, 100, -1, 4, 99]);
});

it('example. output the input', async () => {
  expect.assertions(1);
  const program = [3, 0, 4, 0, 99];
  const { output } = await run(program, [7]);
  expect(output).toEqual([7]);
});

it('input', async () => {
  expect.assertions(1);
  const program = [3, 2, 0];
  await run(program, [99]);
  expect(program).toEqual([3, 2, 99]);
});

it('output', async () => {
  expect.assertions(1);
  const program = [4, 0, 99];
  const { output } = await run(program);
  expect(output).toEqual([4]);
});

describe('#5.2', () => {
  it('outputs 1 if input equals 8; otherwise - 0', async () => {
    expect.assertions(3);
    const program = () => [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    expect((await run(program(), [8])).output).toEqual([1]);
    expect((await run(program(), [7])).output).toEqual([0]);
    expect((await run(program(), [5])).output).toEqual([0]);
  });

  it('outputs 1 if input less than 8; otherwise - 0', async () => {
    expect.assertions(3);
    const program = () => [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    expect((await run(program(), [5])).output).toEqual([1]);
    expect((await run(program(), [8])).output).toEqual([0]);
    expect((await run(program(), [10])).output).toEqual([0]);
  });

  it('[immediate mode] outputs 1 if input equals 8; otherwise - 0', async () => {
    expect.assertions(3);
    const program = () => [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    expect((await run(program(), [8])).output).toEqual([1]);
    expect((await run(program(), [7])).output).toEqual([0]);
    expect((await run(program(), [5])).output).toEqual([0]);
  });

  it('[immediate mode] outputs 1 if input less than 8; otherwise - 0', async () => {
    expect.assertions(3);
    const program = () => [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    expect((await run(program(), [5])).output).toEqual([1]);
    expect((await run(program(), [8])).output).toEqual([0]);
    expect((await run(program(), [10])).output).toEqual([0]);
  });

  describe('jump tests', () => {
    it('[position mode] output 0 if the input was zero or 1 if the input was non-zero', async () => {
      expect.assertions(3);
      const program = () => [
        3,
        12,
        6,
        12,
        15,
        1,
        13,
        14,
        13,
        4,
        13,
        99,
        -1,
        0,
        1,
        9,
      ];
      expect((await run(program(), [0])).output).toEqual([0]);
      expect((await run(program(), [-5])).output).toEqual([1]);
      expect((await run(program(), [5])).output).toEqual([1]);
    });

    it('[immediate mode] output 0 if the input was zero or 1 if the input was non-zero', async () => {
      expect.assertions(3);
      const program = () => [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
      expect((await run(program(), [0])).output).toEqual([0]);
      expect((await run(program(), [-5])).output).toEqual([1]);
      expect((await run(program(), [5])).output).toEqual([1]);
    });
  });

  describe('larger example', () => {
    let program: number[];

    beforeEach(() => {
      program = [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99,
      ];
    });

    it('output 999 if the input value is below 8', async () => {
      expect.assertions(2);
      expect((await run(program, [7])).output).toEqual([999]);
      expect((await run(program, [-5])).output).toEqual([999]);
    });

    it('output 1000 if the input value is equal to 8', async () => {
      expect.assertions(1);
      expect((await run(program, [8])).output).toEqual([1000]);
    });

    it('output 1001 if the input value is greater than 8', async () => {
      expect.assertions(2);
      expect((await run(program, [9])).output).toEqual([1001]);
      expect((await run(program, [100])).output).toEqual([1001]);
    });
  });
});
