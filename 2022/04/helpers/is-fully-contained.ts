import type { Interval, IntervalTuple } from '../types';
import { overlapSize } from './overlap-size';

function length(interval: Interval): number {
  return interval.to - interval.from + 1;
}

export function isFullyContained([first, second]: IntervalTuple): boolean {
  return (
    Math.min(length(first), length(second)) === overlapSize([first, second])
  );
}
