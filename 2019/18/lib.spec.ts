import {
  isDoor,
  isKey,
  findItem,
  parse,
  Block,
  findKeys,
  isWall,
  neighbours,
  getKeysMap,
  game,
} from './lib';
import { one, two, three, four, five } from './fixtures';

test('is key', () => {
  expect(isKey('b')).toBe(true);
  expect(isKey('#')).toBe(false);
  expect(isKey('.')).toBe(false);
  expect(isKey('B')).toBe(false);
});

test('is door', () => {
  expect(isDoor('b')).toBe(false);
  expect(isDoor('#')).toBe(false);
  expect(isDoor('.')).toBe(false);
  expect(isDoor('B')).toBe(true);
});

test('is wall', () => {
  expect(isWall('b')).toBe(false);
  expect(isWall('#')).toBe(true);
  expect(isWall('.')).toBe(false);
  expect(isWall('B')).toBe(false);
});

test('find entrance', () => {
  expect(findItem(parse(one), Block.Entrance)).toEqual({ x: 5, y: 1 });
});

test('find neighbours', () => {
  const map = parse(one);
  expect([...neighbours(map, { x: 5, y: 1 })]).toEqual([
    { x: 4, y: 1 },
    { x: 6, y: 1 },
  ]);
});

test('find keys', () => {
  const map = parse(one);
  const entrance = findItem(map, Block.Entrance);
  expect(findKeys(map, entrance)).toEqual([['a', 2]]);
});

test('keys map', () => {
  const map = parse(one);
  expect(getKeysMap(map)).toEqual(
    new Map([
      ['a', { x: 7, y: 1 }],
      ['b', { x: 1, y: 1 }],
    ]),
  );
});

describe('game', () => {
  it('#1', () => {
    const map = parse(one);
    expect(game(map)).toEqual({ keys: ['a', 'b'], steps: 8 });
  });

  it('#2', () => {
    const map = parse(two);
    expect(game(map)).toEqual({
      keys: ['a', 'b', 'c', 'd', 'e', 'f'],
      steps: 86,
    });
  });

  it('#3', () => {
    const map = parse(three);
    expect(game(map)).toEqual({
      keys: ['b', 'a', 'c', 'd', 'f', 'e', 'g'],
      steps: 132,
    });
  });

  it.skip('#4', () => {
    const map = parse(four);
    expect(game(map)).toEqual({
      keys: [
        'a',
        'f',
        'b',
        'j',
        'g',
        'n',
        'h',
        'd',
        'l',
        'o',
        'e',
        'p',
        'c',
        'i',
        'k',
        'm',
      ],
      steps: 136,
    });
  });

  it('#5', () => {
    const map = parse(five);
    expect(game(map)).toEqual({
      keys: ['a', 'c', 'f', 'i', 'd', 'g', 'b', 'e', 'h'],
      steps: 81,
    });
  });
});
