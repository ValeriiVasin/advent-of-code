import { parseInstruction, run, timeout } from './lib';

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
  expect(run({ program })).resolves.toEqual(
    expect.objectContaining({ program: [1002, 4, 3, 4, 99] }),
  );
});

it('example #2', async () => {
  const program = [1101, 100, -1, 4, 0];
  expect(run({ program })).resolves.toEqual(
    expect.objectContaining({ program: [1101, 100, -1, 4, 99] }),
  );
});

it('example. output the input', async () => {
  const program = [3, 0, 4, 0, 99];
  expect(run({ program, input: [7] })).resolves.toEqual(
    expect.objectContaining({ output: [7] }),
  );
});

it('input', async () => {
  expect(run({ program: [3, 2, 0], input: [99] })).resolves.toEqual(
    expect.objectContaining({ program: [3, 2, 99] }),
  );
});

it('output', async () => {
  expect(run({ program: [4, 0, 99] })).resolves.toEqual(
    expect.objectContaining({ output: [4] }),
  );
});

describe('#5.2', () => {
  it('outputs 1 if input equals 8; otherwise - 0', async () => {
    const program = () => [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    expect(run({ program: program(), input: [7] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  it('outputs 1 if input less than 8; otherwise - 0', async () => {
    const program = () => [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    expect(run({ program: program(), input: [10] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  it('[immediate mode] outputs 1 if input equals 8; otherwise - 0', async () => {
    const program = () => [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    expect(run({ program: program(), input: [7] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
  });

  it('[immediate mode] outputs 1 if input less than 8; otherwise - 0', async () => {
    const program = () => [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    expect(run({ program: program(), input: [5] })).resolves.toEqual(
      expect.objectContaining({ output: [1] }),
    );
    expect(run({ program: program(), input: [8] })).resolves.toEqual(
      expect.objectContaining({ output: [0] }),
    );
    expect(run({ program: program(), input: [10] })).resolves.toEqual(
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
      expect(run({ program: program(), input: [0] })).resolves.toEqual(
        expect.objectContaining({ output: [0] }),
      );
      expect(run({ program: program(), input: [-5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
      expect(run({ program: program(), input: [5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
    });

    it('[immediate mode] output 0 if the input was zero or 1 if the input was non-zero', async () => {
      const program = () => [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
      expect(run({ program: program(), input: [0] })).resolves.toEqual(
        expect.objectContaining({ output: [0] }),
      );
      expect(run({ program: program(), input: [-5] })).resolves.toEqual(
        expect.objectContaining({ output: [1] }),
      );
      expect(run({ program: program(), input: [5] })).resolves.toEqual(
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
      expect(run({ program, input: [7] })).resolves.toEqual(
        expect.objectContaining({ output: [999] }),
      );
      expect(run({ program, input: [-5] })).resolves.toEqual(
        expect.objectContaining({ output: [999] }),
      );
    });

    it('output 1000 if the input value is equal to 8', async () => {
      expect(run({ program, input: [8] })).resolves.toEqual(
        expect.objectContaining({ output: [1000] }),
      );
    });

    it('output 1001 if the input value is greater than 8', async () => {
      expect(run({ program, input: [9] })).resolves.toEqual(
        expect.objectContaining({ output: [1001] }),
      );
      expect(run({ program, input: [100] })).resolves.toEqual(
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
  expect(runPromise).resolves.toEqual(
    expect.objectContaining({ program: [3, 2, 99] }),
  );
});