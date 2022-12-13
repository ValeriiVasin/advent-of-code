import type { Stack } from '../types';

export function stacksToString(stacks: Array<Stack>): string {
  return stacks.map((stack) => stack[stack.length - 1] ?? '').join('');
}
