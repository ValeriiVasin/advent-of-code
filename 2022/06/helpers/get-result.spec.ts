import { getResult } from './get-result';

test('get result #1: test input', () => {
  expect(getResult('test-input.txt')).toBe(11);
});

test('get result #2: test input', () => {
  expect(getResult('test-input.txt', { part: 'two' })).toBe(26);
});
