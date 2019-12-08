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

export enum Mode {
  Normal,
  FeedbackLoop,
}

export const findMaxSignal = async (
  program: number[],
  mode = Mode.Normal,
): Promise<{ signal: number; phases: number[] }> => {
  const availablePhases =
    mode === Mode.Normal ? [0, 1, 2, 3, 4] : [5, 6, 7, 8, 9];
  let maxSignal = -Infinity;
  let maxPhases: number[];

  for (let phases of permutations(availablePhases)) {
    const signal = await amplify(program, phases);
    if (signal > maxSignal) {
      maxSignal = signal;
      maxPhases = phases;
    }
  }

  return { signal: maxSignal, phases: maxPhases };
};

export const amplify = async (
  program: number[],
  phases: number[],
  mode = Mode.Normal,
) => {
  let value = 0;
  for (let phase of phases) {
    const { output } = await run({
      program: [...program],
      input: [phase, value],
    });
    value = output[0];
  }

  return value;
};
