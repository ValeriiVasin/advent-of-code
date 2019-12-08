import { run } from './lib';
import { input } from './input';

function solve(
  input: number[],
  { noun, verb }: { noun: number; verb: number },
) {
  const copy = [...input];
  copy[1] = noun;
  copy[2] = verb;

  const programm = run(copy);

  return programm[0];
}

console.log('answer part #1:', solve(input, { noun: 12, verb: 2 }));
console.assert(
  solve(input, { noun: 12, verb: 2 }) === 4945026,
  'answer part #1',
);

function solveSecond() {
  const EXPECTED = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const result = solve(input, { noun, verb });

      if (result === EXPECTED) {
        return noun * 100 + verb;
      }
    }
  }

  return -1;
}

console.log('answer part #2:', solveSecond());
console.assert(solveSecond() === 5296, 'answer part #2');
