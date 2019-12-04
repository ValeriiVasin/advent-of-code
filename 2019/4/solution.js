function toDigits(value) {
  return String(value)
    .split('')
    .map(_ => Number(_));
}

function isPassword(value) {
  const digits = toDigits(value);

  if (digits.length !== 6) {
    return false;
  }

  let havingTwoAdjacent = false;
  let prev = digits[0];
  for (const digit of digits.slice(1)) {
    if (digit === prev) {
      havingTwoAdjacent = true;
    }

    if (digit < prev) {
      return false;
    }

    prev = digit;
  }

  return havingTwoAdjacent;
}

function solution(from, to) {
  let count = 0;

  for (let i = from; i <= to; i++) {
    if (isPassword(i)) {
      count++;
    }
  }

  return count;
}

console.log('answer #1', solution(125730, 579381));

module.exports = {
  toDigits,
  isPassword,
};
