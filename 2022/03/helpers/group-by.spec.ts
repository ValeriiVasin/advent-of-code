import { groupBy } from './group-by';

test('group by', () => {
  expect(groupBy(['a', 'b', 'c', 'd', 'e'], 2)).toEqual([
    ['a', 'b'],
    ['c', 'd'],
    ['e'],
  ]);
});
