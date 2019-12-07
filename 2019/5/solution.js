const OP_EXIT = 99;
const OP_ADD = 1;
const OP_MULT = 2;
const OP_SAVE = 3;
const OP_OUTPUT = 4;

function add({ program, params: [a, b, to], modes: [modeA, modeB] }) {
  program[to] = getValue(program, a, modeA) + getValue(program, b, modeB);
}

function multiply({ program, params: [a, b, to], modes: [modeA, modeB] }) {
  program[to] = getValue(program, a, modeA) * getValue(program, b, modeB);
}

function save({ program, params: [to], input }) {
  program[to] = input.shift();
}

function output({ program, params: [value], output, modes: [mode] }) {
  output.push(getValue(program, value, mode));
}

const params = new Map([
  [OP_EXIT, 0],
  [OP_ADD, 3],
  [OP_MULT, 3],
  [OP_SAVE, 1],
  [OP_OUTPUT, 1],
]);

const actions = new Map([
  [OP_ADD, add],
  [OP_MULT, multiply],
  [OP_SAVE, save],
  [OP_OUTPUT, output],
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
    action({
      program,
      input,
      output,
      params: program.slice(i + 1, i + 1 + modes.length),
      modes,
    });
    i += modes.length + 1;
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
