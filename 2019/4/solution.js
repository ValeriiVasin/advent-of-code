function toDigits(value) {
  return String(value)
    .split('')
    .map(_ => Number(_));
}

function isIncreasing(digits) {
  let prev = digits[0];
  for (let i = 1; i < digits.length; i++) {
    const current = digits[i];
    if (current < prev) {
      return false;
    }

    prev = current;
  }

  return true;
}

function toGroups(digits) {
  let prev = digits[0];
  const groups = [];
  let groupLength = 1;
  for (let i = 1; i < digits.length; i++) {
    const digit = digits[i];

    if (digit === prev) {
      groupLength++;
      continue;
    }

    groups.push(groupLength);
    groupLength = 1;
    prev = digit;
  }

  groups.push(groupLength);

  return groups;
}

function isPassword(value) {
  const digits = toDigits(value);

  if (digits.length !== 6) {
    return false;
  }

  if (!isIncreasing(digits)) {
    return false;
  }

  return toGroups(digits).some(length => length > 1);
}

function isPasswordImproved(value) {
  const digits = toDigits(value);

  if (digits.length !== 6) {
    return false;
  }

  if (!isIncreasing(digits)) {
    return false;
  }

  return toGroups(digits).includes(2);
}

function solution(from, to, check) {
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

module.exports = {
  isIncreasing,
  toDigits,
  isPassword,
  isPasswordImproved,
  toGroups,
  solution,
};
