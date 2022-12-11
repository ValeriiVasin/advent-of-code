import { getGroupBadge } from './get-group-badge';

describe('get group badge', () => {
  it('sample #1', () => {
    expect(
      getGroupBadge([
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
      ]),
    ).toBe('r');
  });

  it('sample #2', () => {
    expect(
      getGroupBadge([
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ]),
    ).toBe('Z');
  });

  it('badge not found', () => {
    const wrapper = () => getGroupBadge(['abc', 'def']);
    expect(wrapper).toThrowError('Badge not found');
  });
});
