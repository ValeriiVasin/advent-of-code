import { program } from './input';
import { run } from '../5/lib';
import {
  outputToString,
  outputToArray,
  findIntersections,
  calibrate,
} from './lib';

(async function one() {
  const output: number[] = [];
  await run({ program, output });

  const outputArray = outputToArray(output);
  const intersections = findIntersections(outputArray);
  const calibration = calibrate(intersections);

  console.log('answer #17.1:', calibration);
})();
