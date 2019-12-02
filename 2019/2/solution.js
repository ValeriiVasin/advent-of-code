const input = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 10, 1, 19, 1, 19, 5, 23, 1, 23, 9, 27, 2, 27, 6, 31, 1, 31, 6, 35, 2, 35, 9, 39, 1, 6, 39, 43, 2, 10, 43, 47, 1, 47, 9, 51, 1, 51, 6, 55, 1, 55, 6, 59, 2, 59, 10, 63, 1, 6, 63, 67, 2, 6, 67, 71, 1, 71, 5, 75, 2, 13, 75, 79, 1, 10, 79, 83, 1, 5, 83, 87, 2, 87, 10, 91, 1, 5, 91, 95, 2, 95, 6, 99, 1, 99, 6, 103, 2, 103, 6, 107, 2, 107, 9, 111, 1, 111, 5, 115, 1, 115, 6, 119, 2, 6, 119, 123, 1, 5, 123, 127, 1, 127, 13, 131, 1, 2, 131, 135, 1, 135, 10, 0, 99, 2, 14, 0, 0]

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
  '#1'
)

console.assert(
  String(run([2, 3, 0, 3, 99])) === String([2, 3, 0, 6, 99]),
  '#2'
)

console.assert(
  String(run([2, 4, 4, 5, 99, 0])) === String([2, 4, 4, 5, 99, 9801]),
  '#3'
)

console.assert(
  String(run([1, 1, 1, 4, 99, 5, 6, 0, 99])) === String([30, 1, 1, 4, 2, 5, 6, 0, 99]),
  '#4'
)

console.assert(
  String(run([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])) === String([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]),
  'example'
)

function solve() {
  input[1] = 12;
  input[2] = 2;

  const programm = run(input);

  return programm[0];
}

console.log('answer: ', solve());
