const input = require('./input');

const EXIT = 99;
const ADDITION = 1;
const MULTIPLICATION = 2;

function run(programm) {
  for (let i = 0; i < programm.length; i += 4) {
    const operation = programm[i];

    if (operation === EXIT) {
      return programm;
    }

    const operand1 = programm[programm[i + 1]];
    const operand2 = programm[programm[i + 2]];
    const resultIndex = programm[i + 3];

    if (operation === ADDITION) {
      programm[resultIndex] = operand1 + operand2;
      continue;
    }

    if (operation === MULTIPLICATION) {
      programm[resultIndex] = operand1 * operand2;
    }
  }

  return programm;
}

console.assert(
  String(run([1, 0, 0, 0, 99])) === String([2, 0, 0, 0, 99]),
  '#1',
);

console.assert(
  String(run([2, 3, 0, 3, 99])) === String([2, 3, 0, 6, 99]),
  '#2',
);

console.assert(
  String(run([2, 4, 4, 5, 99, 0])) === String([2, 4, 4, 5, 99, 9801]),
  '#3',
);

console.assert(
  String(run([1, 1, 1, 4, 99, 5, 6, 0, 99])) ===
    String([30, 1, 1, 4, 2, 5, 6, 0, 99]),
  '#4',
);

console.assert(
  String(run([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])) ===
    String([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]),
  'example',
);

function solve(input, { noun, verb }) {
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
