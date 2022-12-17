import path from 'path';
import type { FileTree } from '../types';

export function dirStats(fileTree: FileTree): Map<string, number> {
  const result: Map<string, number> = new Map();

  for (const [filepath, fileOrDirectory] of fileTree.entries()) {
    if (fileOrDirectory.type === 'directory') {
      addSize({ result, filepath, size: 0 });
      continue;
    }

    processFileSize({ result, filepath, size: fileOrDirectory.size });
  }

  return result;
}

function processFileSize({
  result,
  filepath,
  size,
}: {
  result: Map<string, number>;
  filepath: string;
  size: number;
}) {
  let currentPath = '/';
  for (const directory of filepath.split('/').slice(0, -1)) {
    currentPath = path.resolve(currentPath, directory);
    addSize({ result, filepath: currentPath, size });
  }
}

function addSize({
  result,
  filepath,
  size,
}: {
  result: Map<string, number>;
  filepath: string;
  size: number;
}) {
  const currentSize = result.get(filepath) ?? 0;
  result.set(filepath, currentSize + size);
}
