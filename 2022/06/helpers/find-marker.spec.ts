import { findMarker } from './find-marker';

describe('part #1', () => {
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
});

describe('part #2', () => {
  test.each([
    ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
    ['nppdvjthqldpwncqszvftbrmjlhg', 23],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
  ])('find marker: %s', (str, expected) => {
    expect(findMarker(str, 14)).toBe(expected);
  });
});
