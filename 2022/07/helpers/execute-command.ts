import path from 'path';
import type { Command, FileTree } from '../types';
import { parseListOutput } from './parse-list-output';

interface ExecuteCommandProps {
  command: Command;
  fileTree: FileTree;
  context: string;
}

export function executeCommand({
  command,
  fileTree,
  context,
}: ExecuteCommandProps): {
  fileTree: FileTree;
  context: string;
} {
  const { type, args, output } = command;

  if (type === 'cd') {
    return { fileTree, context: resolvePath(context, args[0]) };
  }

  if (type === 'ls') {
    return { fileTree: updateTree({ fileTree, output, context }), context };
  }

  return { fileTree, context };
}

function resolvePath(current: string, value: string): string {
  if (value === '/') {
    return '/';
  }

  return path.resolve(current, value);
}

function updateTree({
  fileTree,
  output,
  context,
}: {
  fileTree: FileTree;
  output: Array<string>;
  context: string;
}): FileTree {
  const result = new Map(fileTree);

  for (const fileOrDirectory of parseListOutput(output)) {
    result.set(path.resolve(context, fileOrDirectory.name), fileOrDirectory);
  }

  return result;
}
