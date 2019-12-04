const { isPassword, toDigits } = require('./solution');

test('to digits', () => {
  expect(toDigits(325)).toEqual([3, 2, 5]);
});

test('valid', () => {
  expect(isPassword(111123)).toBe(true);
  expect(isPassword(135579)).toBe(true);
});

test('valid input test data', () => {
  expect(isPassword(111111)).toBe(true);
});

test('not valid input test data', () => {
  expect(isPassword(223450)).toBe(false);
  expect(isPassword(123789)).toBe(false);
});
