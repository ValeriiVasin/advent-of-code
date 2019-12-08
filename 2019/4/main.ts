import { isPassword, isPasswordImproved } from './lib';

function solution(
  from: number,
  to: number,
  check: (password: number) => boolean,
) {
  let count = 0;

  for (let i = from; i <= to; i++) {
    if (check(i)) {
      count++;
    }
  }

  return count;
}

console.log('answer #4.1', solution(125730, 579381, isPassword));
console.log('answer #4.2', solution(125730, 579381, isPasswordImproved));
