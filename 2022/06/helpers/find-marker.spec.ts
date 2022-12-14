import { findMarker } from './find-marker';

test.each([
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
  ['abcd', -1],
  ['abcde', 4],
  ['aaaaaa', -1],
])('find marker: %s', (str, expected) => {
  expect(findMarker(str)).toBe(expected);
});
