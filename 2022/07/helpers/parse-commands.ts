import type { Command, CommandType } from '../types';

const commandRegexp = /^\$ (?<commandType>\w+) ?(?<args>[\w \/\.]+)?$/;
export function parseCommands(lines: Array<string>): Array<Command> {
  const result: Array<Command> = [];
  let output: Array<string> = [];

  for (const line of lines) {
    const commandMatch = line.match(commandRegexp);

    if (!commandMatch) {
      output.push(line);
      continue;
    }

    const commandType = commandMatch.groups?.commandType;
    const args = commandMatch.groups?.args;

    if (!isValidCommandType(commandType)) {
      throw new Error(`Unknown command: "${commandType}"`);
    }

    savePrevCommandOutput(result, output);
    output = [];
    result.push({
      type: commandType,
      args: args ? args.trim().split(' ') : [],
      output: [],
    });
  }

  savePrevCommandOutput(result, output);

  return result;
}

const allowedCommands = new Set(['ls', 'cd']);

function isValidCommandType(
  commandType: string | undefined,
): commandType is CommandType {
  return commandType ? allowedCommands.has(commandType) : false;
}

function savePrevCommandOutput(
  commands: Array<Command>,
  output: Array<string>,
): void {
  if (output.length === 0) {
    return;
  }

  const command = commands[commands.length - 1];
  if (!command) {
    throw new Error('Command output can not be before the command');
  }
  command.output = output;
}
