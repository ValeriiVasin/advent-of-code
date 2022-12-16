import type { FileTree } from '../types';
import { dirStats } from './dir-stats';

const fileTree: FileTree = new Map([
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

test('dir stats', () => {
  expect(dirStats(fileTree)).toEqual(
    new Map([
      ['/', 23_446_939],
      ['/a', 94_269],
      ['/a/e', 0],
      ['/d', 0],
    ]),
  );
});
