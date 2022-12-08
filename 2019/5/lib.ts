export enum Operation {
  Exit = 99,
  Add = 1,
  Multiply = 2,
  Save = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
  AdjustRelativeBase = 9,
}

export const EXECUTION_TIMEOUT = 1;

export const timeout = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

enum Mode {
  Position = 0,
  Immediate = 1,
  Relative = 2,
}

type One = [number];
type ModeOne = [Mode];
type Two = [number, number];
type ModeTwo = [Mode, Mode];
type ModeThree = [Mode, Mode, Mode];
type Three = [number, number, number];

interface Action<P = any, M = any> {
  (params: {
    program: number[];
    input?: number[];
    output: number[];
    params: P;
    modes: M;
    pointer: number;
    base: number;
  }): Promise<{
    pointer: number;
    base: number;
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
  [Operation.AdjustRelativeBase, 1],
]);

const add: Action<Three, ModeThree> = async ({
  program,
  params: [a, b, to],
  modes,
  pointer,
  base,
}) => {
  const [modeA, modeB, modeTo] = modes!;
  const address = getAddress({ value: to, mode: modeTo, base });
  program[address] =
    getValue(program, { value: a, mode: modeA, base }) +
    getValue(program, { value: b, mode: modeB, base });
  return { pointer: pointer + 4, base };
};

const multiply: Action<Three, ModeThree> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB, modeTo],
  pointer,
  base,
}) => {
  const address = getAddress({ value: to, mode: modeTo, base });
  program[address] =
    getValue(program, { value: a, mode: modeA, base }) *
    getValue(program, { value: b, mode: modeB, base });
  return { pointer: pointer + 4, base };
};

const save: Action<One> = async ({
  program,
  params: [to],
  modes: [modeTo],
  input,
  pointer,
  base,
}) => {
  while (!input?.length) {
    await timeout(EXECUTION_TIMEOUT);
  }

  const address = getAddress({ value: to, mode: modeTo, base });
  program[address] = input.shift()!;
  return { pointer: pointer + 2, base };
};

const output: Action<One, ModeOne> = async ({
  program,
  params: [value],
  output,
  modes: [mode],
  pointer,
  base,
}) => {
  output.push(getValue(program, { value, mode, base }));
  return { pointer: pointer + 2, base };
};

const jumpIfTrue: Action<Two, ModeTwo> = async ({
  program,
  params: [a, b],
  modes: [modeA, modeB],
  pointer,
  base,
}) => {
  const aValue = getValue(program, { value: a, mode: modeA, base });
  const bValue = getValue(program, { value: b, mode: modeB, base });

  return aValue === 0
    ? { pointer: pointer + 3, base }
    : { pointer: bValue, base };
};

const jumpIfFalse: Action<Two, ModeTwo> = async ({
  program,
  params: [a, b],
  modes: [modeA, modeB],
  pointer,
  base,
}) => {
  const aValue = getValue(program, { value: a, mode: modeA, base });
  const bValue = getValue(program, { value: b, mode: modeB, base });

  return aValue === 0
    ? { pointer: bValue, base }
    : { pointer: pointer + 3, base };
};

const lessThan: Action<Three, ModeThree> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB, modeTo],
  pointer,
  base,
}) => {
  const valueA = getValue(program, { value: a, mode: modeA, base });
  const valueB = getValue(program, { value: b, mode: modeB, base });
  const address = getAddress({ value: to, mode: modeTo, base });
  program[address] = valueA < valueB ? 1 : 0;
  return { pointer: pointer + 4, base };
};

const equals: Action<Three, ModeThree> = async ({
  program,
  params: [a, b, to],
  modes: [modeA, modeB, modeTo],
  pointer,
  base,
}) => {
  const valueA = getValue(program, { value: a, mode: modeA, base });
  const valueB = getValue(program, { value: b, mode: modeB, base });
  const address = getAddress({ value: to, mode: modeTo, base });
  program[address] = valueA === valueB ? 1 : 0;
  return { pointer: pointer + 4, base };
};

const adjustRelativeBase: Action<One, ModeOne> = async ({
  program,
  params: [a],
  modes: [mode],
  pointer,
  base,
}) => {
  const value = getValue(program, { value: a, mode, base });
  return { pointer: pointer + 2, base: base + value };
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
  [Operation.AdjustRelativeBase, adjustRelativeBase],
]);

export function parseInstruction(value: number): {
  code: number;
  modes: Mode[];
} {
  const code: Operation = value % 100;
  const modes: Mode[] = [];

  value = Math.floor(value / 100);
  const paramsAmount = params.get(code)!;

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
  let relativeBase = 0;
  while (i < program.length) {
    const { code, modes } = parseInstruction(program[i]);

    if (code === Operation.Exit) {
      return { program, output };
    }

    const action = actions.get(code)!;
    const { pointer, base } = await action({
      program,
      input,
      output,
      params: program.slice(i + 1, i + 1 + modes.length),
      modes,
      pointer: i,
      base: relativeBase,
    });

    i = pointer;
    relativeBase = base;
  }

  return { program, output };
}

export const configure = ({
  program,
  input = [],
  output = [],
}: {
  program: number[];
  input: number[];
  output: number[];
}): {
  input: number[];
  output: number[];
  program: number[];
  isDone: () => boolean;
  start: () => ReturnType<typeof run>;
} => {
  let done: boolean = false;

  const start = () =>
    run({ program, input, output }).then((result) => {
      done = true;
      return result;
    });

  return {
    program,
    start,
    input,
    output,
    isDone: () => done,
  };
};

// sometimes we try to read from the memory that was not
// initialized yet. For that case we need to return 0 as a default
function wrapValue(value: number | void) {
  return typeof value === 'undefined' ? 0 : value;
}

function getValue(
  program: number[],
  { value, mode, base }: { value: number; mode: Mode; base: number },
): number {
  if (mode === Mode.Immediate) {
    return wrapValue(value);
  }

  if (mode === Mode.Position) {
    return wrapValue(program[value]);
  }

  // relative
  return wrapValue(program[base + value]);
}

const getAddress = ({
  value,
  mode,
  base,
}: {
  value: number;
  mode: Mode;
  base: number;
}): number => {
  if (mode === Mode.Relative) {
    return base + value;
  }

  // position mode
  // written to parameters guaranteed not to be in immediate mode
  return value;
};
