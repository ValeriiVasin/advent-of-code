import { getResult } from './get-result';

test('get result #1: test input', () => {
  expect(getResult('test-input.txt')).toBe('CMZ');
});

test('get result #2: test input', () => {
  expect(getResult('test-input.txt', { part: 'two' })).toBe('MCD');
});
