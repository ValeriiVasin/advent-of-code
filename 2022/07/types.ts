export interface File {
  type: 'file';
  name: string;
  size: number;
}
export interface Directory {
  type: 'directory';
  name: string;
}

export type FileTree = Map<string, File | Directory>;

export type CommandType = 'ls' | 'cd';

export interface Command {
  type: CommandType;
  args: Array<string>;
  output: Array<string>;
}
