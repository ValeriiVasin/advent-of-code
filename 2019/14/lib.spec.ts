import {
  parseReaction,
  parseReactionItem,
  parseReactionsList,
  ReactionList,
  toOre,
} from './lib';
import { one, two, three, four, five } from './fixtures';

test('parse reaction item', () => {
  expect(parseReactionItem('2 AB')).toEqual({ name: 'AB', amount: 2 });
});

test('parse reaction', () => {
  expect(parseReaction('2 AB, 3 BC, 4 CA => 1 FUEL')).toEqual({
    input: [
      { name: 'AB', amount: 2 },
      { name: 'BC', amount: 3 },
      { name: 'CA', amount: 4 },
    ],
    output: { name: 'FUEL', amount: 1 },
  });
});

test('parse reactions list', () => {
  expect(parseReactionsList(one)).toEqual(
    new Map([
      ['ORE', null],
      ['A', parseReaction('10 ORE => 10 A')],
      ['B', parseReaction('1 ORE => 1 B')],
      ['C', parseReaction('7 A, 1 B => 1 C')],
      ['D', parseReaction('7 A, 1 C => 1 D')],
      ['E', parseReaction('7 A, 1 D => 1 E')],
      ['FUEL', parseReaction('7 A, 1 E => 1 FUEL')],
    ]),
  );
});

describe('converts items by the list', () => {
  describe('#1', () => {
    const list: ReactionList = parseReactionsList(one);

    it('A', () => {
      expect(toOre(list, { name: 'A', amount: 1 })).toBe(10);
      expect(toOre(list, { name: 'A', amount: 10 })).toBe(10);
    });

    it('C', () => {
      expect(toOre(list, { name: 'C', amount: 1 })).toBe(11);
    });

    it('FUEL', () => {
      expect(toOre(list, { name: 'FUEL', amount: 1 })).toBe(31);
    });
  });

  test('#2', () => {
    expect(toOre(parseReactionsList(two), { name: 'FUEL', amount: 1 })).toBe(
      165,
    );
  });

  test('#3', () => {
    expect(toOre(parseReactionsList(three), { name: 'FUEL', amount: 1 })).toBe(
      13312,
    );
  });

  test('#4', () => {
    expect(toOre(parseReactionsList(four), { name: 'FUEL', amount: 1 })).toBe(
      180697,
    );
  });

  test('#5', () => {
    expect(toOre(parseReactionsList(five), { name: 'FUEL', amount: 1 })).toBe(
      2210736,
    );
  });
});
