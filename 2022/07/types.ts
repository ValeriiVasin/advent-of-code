export type FileTree = Map<string, { name: string; size: number }>;

export type CommandType = 'ls' | 'cd';

export interface Command {
  type: CommandType;
  args: Array<string>;
  output: Array<string>;
}
