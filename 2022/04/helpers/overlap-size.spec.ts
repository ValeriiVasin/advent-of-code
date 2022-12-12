import { overlapSize } from './overlap-size';

test('no overlaps', () => {
  expect(
    overlapSize([
      { from: 0, to: 2 },
      { from: 4, to: 5 },
    ]),
  ).toBe(0);
});

test('single overlap', () => {
  expect(
    overlapSize([
      { from: 3, to: 5 },
      { from: 5, to: 5 },
    ]),
  ).toBe(1);
});

test('full overlap', () => {
  expect(
    overlapSize([
      { from: 1, to: 10 },
      { from: 3, to: 4 },
    ]),
  ).toBe(2);
});
