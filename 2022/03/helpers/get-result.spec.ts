import { getResult } from './get-result';

test('get result: test input', () => {
  expect(getResult('test-input.txt')).toBe(157);
});
