import { getFuel, getTotalFuel } from './lib';

test('getFuel', () => {
  expect(getFuel(12)).toBe(2);
  expect(getFuel(14)).toBe(2);
  expect(getFuel(1969)).toBe(654);
  expect(getFuel(100756)).toBe(33583);
});

test('getTotalFuel', () => {
  expect(getTotalFuel(14)).toBe(2);
  expect(getTotalFuel(1969)).toBe(966);
  expect(getTotalFuel(100756)).toBe(50346);
});
