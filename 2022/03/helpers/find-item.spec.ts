import { findItem } from './find-item';

test.each([
  ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
  ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
  ['PmmdzqPrVvPwwTWBwg', 'P'],
  ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
  ['ttgJtRGJQctTZtZT', 't'],
  ['CrZsJsPPZsGzwwsLwLmpwMDw', 's'],
])('find item: %s', (input, expected) => {
  expect(findItem(input)).toBe(expected);
});

test('throw error if common item not met', () => {
  const wrapper = () => findItem('abc');
  expect(wrapper).toThrowError('Common item not found');
});
