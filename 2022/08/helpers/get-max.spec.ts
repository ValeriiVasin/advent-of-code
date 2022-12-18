import { getMax } from './get-max';
import { maxHeightMap } from './max-height-map';

const maxHeightsGrid = maxHeightMap([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

describe('get max', () => {
  test('top left', () => {
    expect(getMax({ maxHeightsGrid, i: 0, j: 0, side: 'left' })).toBe(
      -Infinity,
    );
    expect(getMax({ maxHeightsGrid, i: 0, j: 0, side: 'right' })).toBe(3);
    expect(getMax({ maxHeightsGrid, i: 0, j: 0, side: 'bottom' })).toBe(7);
    expect(getMax({ maxHeightsGrid, i: 0, j: 0, side: 'top' })).toBe(-Infinity);
  });

  test('top right', () => {
    expect(getMax({ maxHeightsGrid, i: 0, j: 2, side: 'left' })).toBe(2);
    expect(getMax({ maxHeightsGrid, i: 0, j: 2, side: 'right' })).toBe(
      -Infinity,
    );
    expect(getMax({ maxHeightsGrid, i: 0, j: 2, side: 'bottom' })).toBe(9);
    expect(getMax({ maxHeightsGrid, i: 0, j: 2, side: 'top' })).toBe(-Infinity);
  });

  test('bottom right', () => {
    expect(getMax({ maxHeightsGrid, i: 2, j: 2, side: 'left' })).toBe(8);
    expect(getMax({ maxHeightsGrid, i: 2, j: 2, side: 'right' })).toBe(
      -Infinity,
    );
    expect(getMax({ maxHeightsGrid, i: 2, j: 2, side: 'bottom' })).toBe(
      -Infinity,
    );
    expect(getMax({ maxHeightsGrid, i: 2, j: 2, side: 'top' })).toBe(6);
  });

  test('bottom left', () => {
    expect(getMax({ maxHeightsGrid, i: 2, j: 0, side: 'left' })).toBe(
      -Infinity,
    );
    expect(getMax({ maxHeightsGrid, i: 2, j: 0, side: 'right' })).toBe(9);
    expect(getMax({ maxHeightsGrid, i: 2, j: 0, side: 'bottom' })).toBe(
      -Infinity,
    );
    expect(getMax({ maxHeightsGrid, i: 2, j: 0, side: 'top' })).toBe(4);
  });

  test('middle', () => {
    expect(getMax({ maxHeightsGrid, i: 1, j: 1, side: 'left' })).toBe(4);
    expect(getMax({ maxHeightsGrid, i: 1, j: 1, side: 'right' })).toBe(6);
    expect(getMax({ maxHeightsGrid, i: 1, j: 1, side: 'bottom' })).toBe(8);
    expect(getMax({ maxHeightsGrid, i: 1, j: 1, side: 'top' })).toBe(2);
  });
});
