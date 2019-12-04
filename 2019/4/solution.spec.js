const {
  isPassword,
  isPasswordImproved,
  isIncreasing,
  toDigits,
  toGroups,
} = require('./solution');

describe('to digits', () => {
  it('converts value to digits', () => {
    expect(toDigits(325)).toEqual([3, 2, 5]);
  });
});

describe('isIncreasing', () => {
  it('increasing only values', () => {
    expect(isIncreasing([1, 2, 3])).toBe(true);
  });

  it('increasing or equal values', () => {
    expect(isIncreasing([1, 2, 2, 3])).toBe(true);
  });

  it('decreasing', () => {
    expect(isIncreasing([1, 2, 2, 1])).toBe(false);
  });
});

describe('grouping', () => {
  it('proper group lengths', () => {
    expect(toGroups([1, 2, 3])).toEqual([1, 1, 1]);
    expect(toGroups([1, 2, 2, 3])).toEqual([1, 2, 1]);
  });
});

describe('part #1', () => {
  it('valid', () => {
    expect(isPassword(111123)).toBe(true);
    expect(isPassword(135579)).toBe(true);
  });

  it('valid input test data', () => {
    expect(isPassword(111111)).toBe(true);
  });

  it('not valid input test data', () => {
    expect(isPassword(223450)).toBe(false);
    expect(isPassword(123789)).toBe(false);
  });
});

describe('part #2', () => {
  it('validnever decrease and all repeated digits are exactly two digits long', () => {
    expect(isPasswordImproved(112233)).toBe(true);
  });

  it('not having exactly 2-digits long group', () => {
    expect(isPasswordImproved(123444)).toBe(false);
  });

  it('having two repeated groups, but one is exactly 2-digits long', () => {
    expect(isPasswordImproved(111122)).toBe(true);
  });
});
