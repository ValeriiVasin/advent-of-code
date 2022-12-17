import { rootTree } from '../constants/root-tree';
import type { Command, FileTree } from '../types';
import { executeCommand } from './execute-command';

describe('execute command', () => {
  let fileTree: FileTree;

  beforeEach(() => {
    fileTree = rootTree;
  });

  test('does not modify current file tree', () => {
    fileTree = Object.freeze(new Map(rootTree));
    const command: Command = { type: 'ls', args: [], output: ['dir a'] };
    const wrapper = () => executeCommand({ command, fileTree, context: '/' });
    expect(wrapper).not.toThrow();
  });

  test('change directory command', () => {
    const command: Command = { type: 'cd', args: ['hello'], output: [] };

    expect(executeCommand({ command, fileTree, context: '/' })).toEqual({
      fileTree,
      context: '/hello',
    });
  });

  test('go to parent', () => {
    const command: Command = { type: 'cd', args: ['..'], output: [] };

    expect(executeCommand({ command, fileTree, context: '/hello' })).toEqual({
      context: '/',
      fileTree,
    });
  });

  test('go to root', () => {
    const command: Command = { type: 'cd', args: ['/'], output: [] };

    expect(executeCommand({ command, fileTree, context: '/' })).toEqual({
      context: '/',
      fileTree,
    });
  });
});

test('list command: add file and directory to file tree', () => {
  const command: Command = {
    type: 'ls',
    args: [],
    output: ['dir a', '14848514 b.txt', '8504156 c.dat'],
  };
  expect(executeCommand({ command, fileTree: rootTree, context: '/' })).toEqual(
    {
      context: '/',
      fileTree: new Map([
        ['/', { type: 'directory', name: '$root$' }],
        ['/a', { type: 'directory', name: 'a' }],
        ['/b.txt', { type: 'file', name: 'b.txt', size: 14_848_514 }],
        ['/c.dat', { type: 'file', name: 'c.dat', size: 8_504_156 }],
      ]),
    },
  );
});

test('add file and directory to file tree with context', () => {
  const command: Command = {
    type: 'ls',
    args: [],
    output: ['dir a', '14848514 b.txt', '8504156 c.dat'],
  };
  expect(executeCommand({ command, fileTree: rootTree, context: '/' })).toEqual(
    {
      context: '/',
      fileTree: new Map([
        ['/', { type: 'directory', name: '$root$' }],
        ['/a', { type: 'directory', name: 'a' }],
        ['/b.txt', { type: 'file', name: 'b.txt', size: 14_848_514 }],
        ['/c.dat', { type: 'file', name: 'c.dat', size: 8_504_156 }],
      ]),
    },
  );
});
