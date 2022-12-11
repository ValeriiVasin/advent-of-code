import { sum } from './sum';

test('correct test result', () => {
  expect(sum([1, 2, 3])).toBe(6);
});
