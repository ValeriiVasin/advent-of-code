export interface Command {
  amount: number;
  from: number;
  to: number;
}

export type Stack = Array<string>;

export interface ParsedInput {
  stacks: Array<Stack>;
  commands: Array<Command>;
}

export interface Options {
  part: 'one' | 'two';
}
