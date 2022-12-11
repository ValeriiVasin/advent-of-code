import { getResult } from './get-result';

test('correct result for the test input', () => {
  expect(getResult('test-input.txt')).toBe(24_000);
});
