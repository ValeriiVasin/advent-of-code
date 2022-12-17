import { parseCommands } from './parse-commands';

describe('list', () => {
  test('empty list', () => {
    const lines = ['$ ls'];
    expect(parseCommands(lines)).toEqual([
      { type: 'ls', args: [], output: [] },
    ]);
  });

  test('list with output', () => {
    const lines = ['$ ls', 'dir a', '14848514 b.txt'];
    expect(parseCommands(lines)).toEqual([
      {
        type: 'ls',
        args: [],
        output: ['dir a', '14848514 b.txt'],
      },
    ]);
  });
});

describe('change directory', () => {
  test('change to the root', () => {
    const lines = ['$ cd /'];
    expect(parseCommands(lines)).toEqual([
      { type: 'cd', args: ['/'], output: [] },
    ]);
  });

  test('change to another directory', () => {
    const lines = ['$ cd f'];
    expect(parseCommands(lines)).toEqual([
      { type: 'cd', args: ['f'], output: [] },
    ]);
  });

  test('change directory to parent', () => {
    const lines = ['$ cd ..'];
    expect(parseCommands(lines)).toEqual([
      { type: 'cd', args: ['..'], output: [] },
    ]);
  });
});

test('multiple commands', () => {
  const lines = [
    '$ cd /',
    '$ ls',
    'dir plws',
    'dir pwlbgbz',
    'dir pwtpltr',
    'dir szn',
    '$ cd plws',
    '$ cd ..',
  ];

  expect(parseCommands(lines)).toEqual([
    { type: 'cd', args: ['/'], output: [] },
    {
      type: 'ls',
      args: [],
      output: ['dir plws', 'dir pwlbgbz', 'dir pwtpltr', 'dir szn'],
    },
    { type: 'cd', args: ['plws'], output: [] },
    { type: 'cd', args: ['..'], output: [] },
  ]);
});

test('throw if command is invalid', () => {
  const lines = ['$ hello'];
  const wrapper = () => parseCommands(lines);
  expect(wrapper).toThrowError('Unknown command: "hello"');
});

test('throws if output is before the command', () => {
  const lines = ['dir plws', 'dir pwlbgbz', '$ ls'];
  const wrapper = () => parseCommands(lines);
  expect(wrapper).toThrowError('Command output can not be before the command');
});
