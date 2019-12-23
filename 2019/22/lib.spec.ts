import {
  reverse,
  cut,
  increment,
  smartShuffle,
  multiShuffle,
  createDeck,
} from './lib';

describe('shuffles', () => {
  let deck: number[];

  beforeEach(() => {
    deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  });

  it('reverse', () => {
    expect(reverse(deck)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  });

  it('cut positive', () => {
    expect(cut(deck, 3)).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
  });

  it('cut negative', () => {
    expect(cut(deck, -4)).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
  });

  it('increment', () => {
    expect(increment(deck, 3)).toEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3]);
  });

  describe('smart shuffle', () => {
    it('reverse', () => {
      expect(smartShuffle(deck, 'deal into new stack')).toEqual([
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
      ]);
    });

    it('cut positive', () => {
      expect(smartShuffle(deck, 'cut 3')).toEqual([
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        1,
        2,
      ]);
    });

    it('cut negative', () => {
      expect(smartShuffle(deck, 'cut -4')).toEqual([
        6,
        7,
        8,
        9,
        0,
        1,
        2,
        3,
        4,
        5,
      ]);
    });

    it('increment', () => {
      expect(smartShuffle(deck, 'deal with increment 3')).toEqual([
        0,
        7,
        4,
        1,
        8,
        5,
        2,
        9,
        6,
        3,
      ]);
    });
  });

  describe('multi shuffle', () => {
    it('one', () => {
      const shuffles = `
        deal with increment 7
        deal into new stack
        deal into new stack
      `;

      expect(multiShuffle(deck, shuffles)).toEqual([
        0,
        3,
        6,
        9,
        2,
        5,
        8,
        1,
        4,
        7,
      ]);
    });

    it('two', () => {
      const shuffles = `
        cut 6
        deal with increment 7
        deal into new stack
      `;
      expect(multiShuffle(deck, shuffles)).toEqual([
        3,
        0,
        7,
        4,
        1,
        8,
        5,
        2,
        9,
        6,
      ]);
    });

    it('three', () => {
      const shuffles = `
        deal with increment 7
        deal with increment 9
        cut -2
      `;

      expect(multiShuffle(deck, shuffles)).toEqual([
        6,
        3,
        0,
        7,
        4,
        1,
        8,
        5,
        2,
        9,
      ]);
    });

    it('four', () => {
      const shuffles = `
        deal into new stack
        cut -2
        deal with increment 7
        cut 8
        cut -4
        deal with increment 7
        cut 3
        deal with increment 9
        deal with increment 3
        cut -1
      `;

      expect(multiShuffle(deck, shuffles)).toEqual([
        9,
        2,
        5,
        8,
        1,
        4,
        7,
        0,
        3,
        6,
      ]);
    });
  });
});

test('create deck', () => {
  expect(createDeck(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
