import type { IntervalTuple } from '../types';

export function overlapSize([first, second]: IntervalTuple): number {
  return Math.max(
    0,
    Math.min(first.to, second.to) - Math.max(second.from, first.from) + 1,
  );
}
