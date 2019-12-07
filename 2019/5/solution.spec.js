const { parseInstruction, run } = require('./solution');

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

it('example #1', () => {
  const program = [1002, 4, 3, 4, 33];
  run(program);
  expect(program).toEqual([1002, 4, 3, 4, 99]);
});

it('example #2', () => {
  const program = [1101, 100, -1, 4, 0];
  run(program);
  expect(program).toEqual([1101, 100, -1, 4, 99]);
});

it('example. output the input', () => {
  const program = [3, 0, 4, 0, 99];
  const { output } = run(program, [7]);
  expect(output).toEqual([7]);
});

it('input', () => {
  const program = [3, 2, 0];
  run(program, [99]);
  expect(program).toEqual([3, 2, 99]);
});

it('output', () => {
  const program = [4, 0, 99];
  const { output } = run(program);
  expect(output).toEqual([4]);
});
