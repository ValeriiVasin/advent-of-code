import type { Command, FileTree } from '../types';
import { executeCommands } from './execute-commands';

test('executes series of commands', () => {
  const commands: Array<Command> = [
    { type: 'cd', args: ['/'], output: [] },
    {
      type: 'ls',
      args: [],
      output: ['dir a', '14848514 b.txt', '8504156 c.dat', 'dir d'],
    },
    { type: 'cd', args: ['a'], output: [] },
    {
      type: 'ls',
      args: [],
      output: ['dir e', '29116 f', '2557 g', '62596 h.lst'],
    },
  ];
  const expectedFileTree: FileTree = new Map([
    ['/', { type: 'directory', name: '$root$' }],
    ['/a', { type: 'directory', name: 'a' }],
    ['/b.txt', { type: 'file', name: 'b.txt', size: 14848514 }],
    ['/c.dat', { type: 'file', name: 'c.dat', size: 8504156 }],
    ['/d', { type: 'directory', name: 'd' }],
    ['/a/e', { type: 'directory', name: 'e' }],
    ['/a/f', { type: 'file', name: 'f', size: 29116 }],
    ['/a/g', { type: 'file', name: 'g', size: 2557 }],
    ['/a/h.lst', { type: 'file', name: 'h.lst', size: 62596 }],
  ]);

  expect(executeCommands({ commands })).toEqual({
    fileTree: expectedFileTree,
    context: '/a',
  });
});
