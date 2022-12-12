import { isFullyContained } from './is-fully-contained';

test('not overlapping', () => {
  expect(
    isFullyContained([
      { from: 2, to: 4 },
      { from: 6, to: 8 },
    ]),
  ).toBe(false);
});

test('partial overlap', () => {
  expect(
    isFullyContained([
      { from: 5, to: 7 },
      { from: 7, to: 9 },
    ]),
  ).toBe(false);
});

test('fully overlap single block', () => {
  expect(
    isFullyContained([
      { from: 6, to: 6 },
      { from: 4, to: 6 },
    ]),
  ).toBe(true);
});

test('fully overlapped', () => {
  expect(
    isFullyContained([
      { from: 2, to: 8 },
      { from: 3, to: 7 },
    ]),
  ).toBe(true);
});
