import { rootTree } from '../constants/root-tree';
import type { Command, FileTree } from '../types';
import { executeCommand } from './execute-command';

interface ExecuteCommandsProps {
  commands: Array<Command>;
  fileTree?: FileTree;
  context?: string;
}

export function executeCommands({
  commands,
  fileTree = rootTree,
  context = '/',
}: ExecuteCommandsProps): { fileTree: FileTree; context: string } {
  for (const command of commands) {
    const result = executeCommand({ command, fileTree, context });
    fileTree = result.fileTree;
    context = result.context;
  }
  return { fileTree, context };
}
