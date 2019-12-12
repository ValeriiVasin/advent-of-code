import { parseInstruction, run, timeout, configure } from './lib';

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
  const program = [1002, 4, 3, 4, 33];
  await expect(run({ program })).resolves.toEqual(
    expect.objectContaining({ program: [1002, 4, 3, 4, 99] }),
  );
});

it('example #2', async () => {
  const program = [1101, 100, -1, 4, 0];
  await expect(run({ program })).resolves.toEqual(
    expect.objectContaining({ program: [1101, 100, -1, 4, 99] }),
  );
});

it('example. output the input', async () => {
  const program = [3, 0, 4, 0, 99];
  await expect(run({ program, input: [7] })).resolves.toEqual(
    expect.objectContaining({ output: [7] }),
  );
});

it('input', async () => {
  await expect(run({ program: [3, 2, 0], input: [99] })).resolves.toEqual(
    expect.objectContaining({ program: [3, 2, 99] }),
  );
});

it('output', async () => {
  await expect(run({ program: [4, 0, 99] })).resolves.toEqual(
    expect.objectContaining({ output: [4] }),
  );
});

describe('#5.2', () => {
  it('outputs 1 if input equals 8; otherwise - 0', async () => {
    const program = () => [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    await expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    await expect(run({ program: program(), input: [7] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    await expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  it('outputs 1 if input less than 8; otherwise - 0', async () => {
    const program = () => [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    await expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    await expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    await expect(run({ program: program(), input: [10] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  it('[immediate mode] outputs 1 if input equals 8; otherwise - 0', async () => {
    const program = () => [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    await expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    await expect(run({ program: program(), input: [7] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    await expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  it('[immediate mode] outputs 1 if input less than 8; otherwise - 0', async () => {
    const program = () => [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    await expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    await expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    await expect(run({ program: program(), input: [10] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  describe('jump tests', () => {
    it('[position mode] output 0 if the input was zero or 1 if the input was non-zero', async () => {
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
      await expect(run({ program: program(), input: [0] })).resolves.toEqual(
        expect.objectContaining({ output: [0] }),
      );
      await expect(run({ program: program(), input: [-5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
      await expect(run({ program: program(), input: [5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
    });

    it('[immediate mode] output 0 if the input was zero or 1 if the input was non-zero', async () => {
      const program = () => [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
      await expect(run({ program: program(), input: [0] })).resolves.toEqual(
        expect.objectContaining({ output: [0] }),
      );
      await expect(run({ program: program(), input: [-5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
      await expect(run({ program: program(), input: [5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
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
      await expect(run({ program, input: [7] })).resolves.toEqual(
        expect.objectContaining({ output: [999] }),
      );
      await expect(run({ program, input: [-5] })).resolves.toEqual(
        expect.objectContaining({ output: [999] }),
      );
    });

    it('output 1000 if the input value is equal to 8', async () => {
      await expect(run({ program, input: [8] })).resolves.toEqual(
        expect.objectContaining({ output: [1000] }),
      );
    });

    it('output 1001 if the input value is greater than 8', async () => {
      await expect(run({ program, input: [9] })).resolves.toEqual(
        expect.objectContaining({ output: [1001] }),
      );
      await expect(run({ program, input: [100] })).resolves.toEqual(
        expect.objectContaining({ output: [1001] }),
      );
    });
  });
});

it('waits for the input data available', async () => {
  const program = [3, 2, 0];
  const input: number[] = [];
  const runPromise = run({ program, input });
  await timeout(50);
  input.push(99);
  await expect(runPromise).resolves.toEqual(
    expect.objectContaining({ program: [3, 2, 99] }),
  );
});

// https://adventofcode.com/2019/day/9
describe('relative mode', () => {
  it('relative mode param', async () => {
    const program = [204, 2, 99];
    await expect(run({ program })).resolves.toEqual(
      expect.objectContaining({
        output: [99],
      }),
    );
  });

  it('relative mode with modification operation', async () => {
    const program = [109, 1, 204, 3, 99];
    await expect(run({ program })).resolves.toEqual(
      expect.objectContaining({
        output: [99],
      }),
    );
  });

  it('#1', async () => {
    const program = [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99,
    ];

    await expect(run({ program })).resolves.toEqual(
      expect.objectContaining({ output: [...program] }),
    );
  });

  it('#2', async () => {
    const program = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
    await expect(run({ program })).resolves.toEqual(
      expect.objectContaining({ output: [1219070632396864] }),
    );
  });

  it('#3', async () => {
    const program = [104, 1125899906842624, 99];
    await expect(run({ program })).resolves.toEqual(
      expect.objectContaining({ output: [1125899906842624] }),
    );
  });

  it('parameters in relative mode can be read from or written to', async () => {
    const program = [109, 2, 203, 1, 99];
    const input = [5];

    await expect(run({ program, input })).resolves.toEqual(
      expect.objectContaining({
        program: [109, 2, 203, 5, 99],
      }),
    );
  });
});

it('supports run with configuration', async () => {
  const program = [3, 0, 4, 0, 3, 0, 4, 0, 99];
  const input: number[] = [33, 42];
  const output: number[] = [];
  const software = configure({ program, input, output });
  expect.assertions(2);
  await software.start();
  expect(output).toEqual([33, 42]);
  expect(software.isDone()).toBe(true);
});
