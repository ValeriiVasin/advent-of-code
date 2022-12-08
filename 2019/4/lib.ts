export function toDigits(value: number) {
  return String(value)
    .split('')
    .map((_) => Number(_));
}

export function isIncreasing(digits: number[]) {
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

export function toGroups(digits: number[]): number[] {
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

export function isPassword(value: number) {
  const digits = toDigits(value);

  if (digits.length !== 6) {
    return false;
  }

  if (!isIncreasing(digits)) {
    return false;
  }

  return toGroups(digits).some((length) => length > 1);
}

export function isPasswordImproved(value: number) {
  const digits = toDigits(value);

  if (digits.length !== 6) {
    return false;
  }

  if (!isIncreasing(digits)) {
    return false;
  }

  return toGroups(digits).includes(2);
}
