import { getMaxHeightsGrid } from './get-max-heights-grid';

test('max height map', () => {
  const heights = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  expect(getMaxHeightsGrid(heights)).toEqual([
    [
      { top: 1, right: 3, bottom: 7, left: 1 },
      { top: 2, right: 3, bottom: 8, left: 2 },
      { top: 3, right: 3, bottom: 9, left: 3 },
    ],
    [
      { top: 4, right: 6, bottom: 7, left: 4 },
      { top: 5, right: 6, bottom: 8, left: 5 },
      { top: 6, right: 6, bottom: 9, left: 6 },
    ],
    [
      { top: 7, right: 9, bottom: 7, left: 7 },
      { top: 8, right: 9, bottom: 8, left: 8 },
      { top: 9, right: 9, bottom: 9, left: 9 },
    ],
  ]);
});
