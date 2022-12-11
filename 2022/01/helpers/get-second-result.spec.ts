import { getSecondResult } from './get-second-result';

test('correct result for the test input', () => {
  expect(getSecondResult('test-input.txt')).toBe(45_000);
});
