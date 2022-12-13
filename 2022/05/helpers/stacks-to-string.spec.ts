import type { Stack } from '../types';
import { stacksToString } from './stacks-to-string';

test('stacks to string', () => {
  const stacks: Array<Stack> = [['C'], ['M'], ['P', 'D', 'N', 'Z']];

  expect(stacksToString(stacks)).toBe('CMZ');
});

test('stacks with empty stack to string', () => {
  const stacks: Array<Stack> = [['C'], [], ['P', 'D', 'N', 'Z']];

  expect(stacksToString(stacks)).toBe('CZ');
});
