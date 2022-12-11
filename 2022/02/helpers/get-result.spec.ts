import { getResult } from './get-result';

test('#1: correct result for the test input', () => {
  expect(getResult('test-input.txt')).toBe(15);
});

test('#2: correct result for the test input', () => {
  expect(getResult('test-input.txt', { adjusted: true })).toBe(12);
});
