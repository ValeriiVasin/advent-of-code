const EXIT = 99;
const ADDITION = 1;
const MULTIPLICATION = 2;

export function run(programm: number[]): number[] {
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
