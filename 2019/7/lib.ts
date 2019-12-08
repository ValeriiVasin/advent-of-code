import { run } from '../5/lib';

export function permutations(
  available: number[],
  result: number[] = [],
  results: Array<number[]> = [],
): Array<number[]> {
  if (available.length === 0) {
    results.push([...result]);
    return results;
  }

  for (let i = 0; i < available.length; i++) {
    const value = available[i];
    result.push(value);
    available.splice(i, 1);
    permutations(available, result, results);
    available.splice(i, 0, value);
    result.pop();
  }

  return results;
}

export const findMaxSignal = (
  program: number[],
): { signal: number; phases: number[] } => {
  let maxSignal = -Infinity;
  let maxPhases: number[];
  for (let phases of permutations([0, 1, 2, 3, 4])) {
    const signal = amplify(program, phases);
    if (signal > maxSignal) {
      maxSignal = signal;
      maxPhases = phases;
    }
  }

  return { signal: maxSignal, phases: maxPhases };
};

export const amplify = (program: number[], phases: number[]): number => {
  let value = 0;
  for (let phase of phases) {
    const { output } = run([...program], [phase, value]);
    value = output[0];
  }

  return value;
};
