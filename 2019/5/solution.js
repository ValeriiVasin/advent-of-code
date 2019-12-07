const OP_EXIT = 99;
const OP_ADD = 1;
const OP_MULT = 2;
const OP_SAVE = 3;
const OP_OUTPUT = 4;
const OP_JUMP_IF_TRUE = 5;
const OP_JUMP_IF_FALSE = 6;
const OP_LESS_THAN = 7;
const OP_EQUALS = 8;

const params = new Map([
  [OP_EXIT, 0],
  [OP_ADD, 3],
  [OP_MULT, 3],
  [OP_SAVE, 1],
  [OP_OUTPUT, 1],
  [OP_JUMP_IF_TRUE, 2],
  [OP_JUMP_IF_FALSE, 2],
  [OP_LESS_THAN, 3],
  [OP_EQUALS, 3],
]);

function add({ program, params: [a, b, to], modes: [modeA, modeB], pointer }) {
  program[to] = getValue(program, a, modeA) + getValue(program, b, modeB);
  return { pointer: pointer + 4 };
}

function multiply({ program, params: [a, b, to], modes: [modeA, modeB], pointer }) {
  program[to] = getValue(program, a, modeA) * getValue(program, b, modeB);
  return { pointer: pointer + 4 }
}

function save({ program, params: [to], input, pointer }) {
  program[to] = input.shift();
  return { pointer: pointer + 2 };
}

function output({ program, params: [value], output, modes: [mode], pointer }) {
  output.push(getValue(program, value, mode));
  return { pointer: pointer + 2 };
}

function jumpIfTrue({ program, params: [a, b], modes: [modeA, modeB], pointer }) {
  const aValue = getValue(program, a, modeA);
  const bValue = getValue(program, b, modeB);

  return aValue === 0 ? { pointer: pointer + 3 } : { pointer: bValue };
}

function jumpIfFalse({ program, params: [a, b], modes: [modeA, modeB], pointer }) {
  const aValue = getValue(program, a, modeA);
  const bValue = getValue(program, b, modeB);

  return aValue === 0 ? { pointer: bValue } : { pointer: pointer + 3 };
}

function lessThan({ program, params: [a, b, to], modes: [modeA, modeB], pointer }) {
  const valueA = getValue(program, a, modeA);
  const valueB = getValue(program, b, modeB);
  program[to] = valueA < valueB ? 1 : 0;
  return { pointer: pointer + 4 };
}

function equals({ program, params: [a, b, to], modes: [modeA, modeB], pointer }) {
  const valueA = getValue(program, a, modeA);
  const valueB = getValue(program, b, modeB);
  program[to] = valueA === valueB ? 1 : 0;
  return { pointer: pointer + 4 };
}

const actions = new Map([
  [OP_ADD, add],
  [OP_MULT, multiply],
  [OP_SAVE, save],
  [OP_OUTPUT, output],
  [OP_JUMP_IF_TRUE, jumpIfTrue],
  [OP_JUMP_IF_FALSE, jumpIfFalse],
  [OP_LESS_THAN, lessThan],
  [OP_EQUALS, equals],
]);

const MODE_POSITION = 0;
const MODE_IMMEDIATE = 1;

function parseInstruction(value) {
  const code = value % 100;
  const modes = [];

  value = Math.floor(value / 100);
  const paramsAmount = params.get(code);

  for (let i = 0; i < paramsAmount; i++) {
    const mode = value % 10;
    modes.push(mode);
    value = Math.floor(value / 10);
  }

  return {
    code,
    modes,
  };
}

function run(program, input = []) {
  const output = [];

  let i = 0;
  while (i < program.length) {
    const { code, modes } = parseInstruction(program[i]);

    if (code === OP_EXIT) {
      return { program, output };
    }

    const action = actions.get(code);
    const { pointer } = action({
      program,
      input,
      output,
      params: program.slice(i + 1, i + 1 + modes.length),
      modes,
      pointer: i,
    });

    i = pointer;
  }

  return { program, output };
}

function getValue(program, value, mode) {
  return mode === MODE_IMMEDIATE ? value : program[value];
}

module.exports = {
  parseInstruction,
  run,
};
