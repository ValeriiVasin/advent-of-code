import { program } from './input';
import { run } from '../5/lib';
import {
  outputToString,
  outputToArray,
  findIntersections,
  calibrate,
  move,
} from './lib';

(async function one() {
  const output: number[] = [];
  await run({ program: [...program], output });

  const outputArray = outputToArray(output);
  const intersections = findIntersections(outputArray);
  const calibration = calibrate(intersections);

  console.log('answer #17.1:', calibration);
})();

const toASCII = (str: string): number[] => {
  return str.split('').map((v) => v.charCodeAt(0));
};

const programInput = (
  main: string,
  A: string,
  B: string,
  C: string,
  video: string,
): number[] => {
  const input: number[] = [
    ...toASCII(main),
    10,
    ...toASCII(A),
    10,
    ...toASCII(B),
    10,
    ...toASCII(C),
    10,
    ...toASCII(video),
    10,
  ];

  return input;
};

(async function two() {
  const main = 'A,B,A,C,A,B,A,C,B,C';
  const A = 'R,4,L,12,L,8,R,4';
  const B = 'L,8,R,10,R,10,R,6';
  const C = 'R,4,R,10,L,12';

  const input = programInput(main, A, B, C, 'n');
  const output: number[] = [];
  const changedProgram = [...program];
  changedProgram[0] = 2;
  await run({ program: [...changedProgram], output, input });

  console.log('answer #17.2:', output.pop());
})();
