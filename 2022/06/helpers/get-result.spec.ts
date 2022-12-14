import { getResult } from './get-result';

test('get result #1: test input', () => {
  expect(getResult('test-input.txt')).toBe(11);
});
