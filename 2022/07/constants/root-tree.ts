import type { FileTree } from '../types';

export const rootTree: FileTree = new Map([
  ['/', { type: 'directory', name: '$root$' }],
]);
