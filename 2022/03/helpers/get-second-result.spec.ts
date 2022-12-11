import { getSecondResult } from './get-second-result';

test('get result: test input', () => {
  expect(getSecondResult('test-input.txt')).toBe(70);
});
