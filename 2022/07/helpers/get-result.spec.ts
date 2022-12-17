import { Part } from '../types';
import { getResult } from './get-result';

test('get result #1: test input', () => {
  expect(getResult('test-input.txt')).toBe(95_437);
});

test('get result #2: test input', () => {
  expect(getResult('test-input.txt', Part.Two)).toBe(24_933_642);
});
