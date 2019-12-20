import { one } from './fixtures';
import {
  outputToString,
  pictureToOutput,
  findIntersections,
  outputToArray,
  calibrate,
} from './lib';

test('picture to output / output to string', () => {
  expect(outputToString(pictureToOutput(one))).toBe(one);
});

test('intersections', () => {
  expect(findIntersections(outputToArray(pictureToOutput(one)))).toEqual([
    { x: 2, y: 2 },
    { x: 2, y: 4 },
    { x: 6, y: 4 },
    { x: 10, y: 4 },
  ]);
});

test('calibration', () => {
  expect(
    calibrate([
      { x: 2, y: 2 },
      { x: 2, y: 4 },
      { x: 6, y: 4 },
      { x: 10, y: 4 },
    ]),
  ).toBe(76);
});
