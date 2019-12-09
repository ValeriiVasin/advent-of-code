enum Operation {
  Exit = 99,
  Add = 1,
  Multiply = 2,
  Save = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
}

export const EXECUTION_TIMEOUT = 1;

enum Mode {
  Position = 0,
  Immediate = 1,
}

type One = [number];
type ModeOne = [Mode];
type Two = [number, number];
type ModeTwo = [Mode, Mode];
type Three = [number, number, number];

interface Action<P = any, M = any> {
  (params: {
    program: number[];
    input?: number[];
    output: number[];
    params: P;
    modes?: M;
    pointer: number;
  }): Promise<{
    pointer: number;
  }>;
}

const params = new Map([
  [Operation.Exit, 0],
  [Operation.Add, 3],
  [Operation.Multiply, 3],
  [Operation.Save, 1],
  [Operation.Output, 1],
  [Operation.JumpIfTrue, 2],
  [Operation.JumpIfFalse, 2],
  [Operation.LessThan, 3],
  [Operation.Equals, 3],
]);

const add: Action<Three, ModeTwo> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB],
  pointer,
}) => {
  program[to] = getValue(program, a, modeA) + getValue(program, b, modeB);
  return { pointer: pointer + 4 };
};

const multiply: Action<Three, ModeTwo> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB],
  pointer,
}) => {
  program[to] = getValue(program, a, modeA) * getValue(program, b, modeB);
  return { pointer: pointer + 4 };
};

export const timeout = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

const save: Action<One> = async ({ program, params: [to], input, pointer }) => {
  while (input.length === 0) {
    await timeout(EXECUTION_TIMEOUT);
  }

  program[to] = input.shift();
  return { pointer: pointer + 2 };
};

const output: Action<One, ModeOne> = async ({
  program,
  params: [value],
  output,
  modes: [mode],
  pointer,
}) => {
  output.push(getValue(program, value, mode));
  return { pointer: pointer + 2 };
};

const jumpIfTrue: Action<Two, ModeTwo> = async ({
  program,
  params: [a, b],
  modes: [modeA, modeB],
  pointer,
}) => {
  const aValue = getValue(program, a, modeA);
  const bValue = getValue(program, b, modeB);

  return aValue === 0 ? { pointer: pointer + 3 } : { pointer: bValue };
};

const jumpIfFalse: Action<Two, ModeTwo> = async ({
  program,
  params: [a, b],
  modes: [modeA, modeB],
  pointer,
}) => {
  const aValue = getValue(program, a, modeA);
  const bValue = getValue(program, b, modeB);

  return aValue === 0 ? { pointer: bValue } : { pointer: pointer + 3 };
};

const lessThan: Action<Three, ModeTwo> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB],
  pointer,
}) => {
  const valueA = getValue(program, a, modeA);
  const valueB = getValue(program, b, modeB);
  program[to] = valueA < valueB ? 1 : 0;
  return { pointer: pointer + 4 };
};

const equals: Action<Three, ModeTwo> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB],
  pointer,
}) => {
  const valueA = getValue(program, a, modeA);
  const valueB = getValue(program, b, modeB);
  program[to] = valueA === valueB ? 1 : 0;
  return { pointer: pointer + 4 };
};

const actions = new Map<Operation, Action>([
  [Operation.Add, add],
  [Operation.Multiply, multiply],
  [Operation.Save, save],
  [Operation.Output, output],
  [Operation.JumpIfTrue, jumpIfTrue],
  [Operation.JumpIfFalse, jumpIfFalse],
  [Operation.LessThan, lessThan],
  [Operation.Equals, equals],
]);

export function parseInstruction(
  value: number,
): { code: number; modes: Mode[] } {
  const code: Operation = value % 100;
  const modes: Mode[] = [];

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

export async function run({
  program,
  input = [],
  output = [],
}: {
  program: number[];
  input?: number[];
  output?: number[];
}) {
  let i = 0;
  while (i < program.length) {
    const { code, modes } = parseInstruction(program[i]);

    if (code === Operation.Exit) {
      return { program, output };
    }

    const action = actions.get(code);
    const { pointer } = await action({
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

function getValue(program: number[], value: number, mode: Mode): number {
  return mode === Mode.Immediate ? value : program[value];
}
