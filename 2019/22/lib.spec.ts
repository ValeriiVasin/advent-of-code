import {
  reverse,
  cut,
  increment,
  smartShuffle,
  multiShuffle,
  createDeck,
  trackReverse,
  trackCut,
  trackIncrement,
  trackSmartShuffle,
  trackMultiShuffle,
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
        9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ]);
    });

    it('cut positive', () => {
      expect(smartShuffle(deck, 'cut 3')).toEqual([
        3, 4, 5, 6, 7, 8, 9, 0, 1, 2,
      ]);
    });

    it('cut negative', () => {
      expect(smartShuffle(deck, 'cut -4')).toEqual([
        6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
      ]);
    });

    it('increment', () => {
      expect(smartShuffle(deck, 'deal with increment 3')).toEqual([
        0, 7, 4, 1, 8, 5, 2, 9, 6, 3,
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
        0, 3, 6, 9, 2, 5, 8, 1, 4, 7,
      ]);
    });

    it('two', () => {
      const shuffles = `
        cut 6
        deal with increment 7
        deal into new stack
      `;
      expect(multiShuffle(deck, shuffles)).toEqual([
        3, 0, 7, 4, 1, 8, 5, 2, 9, 6,
      ]);
    });

    it('three', () => {
      const shuffles = `
        deal with increment 7
        deal with increment 9
        cut -2
      `;

      expect(multiShuffle(deck, shuffles)).toEqual([
        6, 3, 0, 7, 4, 1, 8, 5, 2, 9,
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
        9, 2, 5, 8, 1, 4, 7, 0, 3, 6,
      ]);
    });
  });
});

test('create deck', () => {
  expect(createDeck(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

describe.only('tracking position', () => {
  it('reverse', () => {
    expect(trackReverse(0, 10)).toBe(9);
    expect(trackReverse(3, 10)).toBe(6);
  });

  it('cut positive (inside cutted)', () => {
    expect(trackCut(0, 10, 3)).toBe(7);
    expect(trackCut(0, 10, 1)).toBe(9);
  });

  it('cut positive (outside cutted)', () => {
    expect(trackCut(3, 10, 3)).toBe(0);
    expect(trackCut(1, 10, 1)).toBe(0);
  });

  it('cut negative (inside cutted)', () => {
    expect(trackCut(9, 10, -3)).toBe(2);
    expect(trackCut(9, 10, -1)).toBe(0);
  });

  it('cut negative (outside cutted)', () => {
    expect(trackCut(0, 10, -3)).toBe(3);
    expect(trackCut(8, 10, -1)).toBe(9);
  });

  it('increment', () => {
    expect(trackIncrement(0, 10, 3)).toBe(0);
    expect(trackIncrement(1, 10, 3)).toBe(3);
    expect(trackIncrement(9, 10, 3)).toBe(7);
  });

  describe('track smart shuffle', () => {
    it('reverse', () => {
      expect(trackSmartShuffle(0, 10, 'deal into new stack')).toBe(9);
    });

    it('cut positive', () => {
      expect(trackSmartShuffle(0, 10, 'cut 3')).toBe(7);
    });

    it('cut negative', () => {
      expect(trackSmartShuffle(0, 10, 'cut -4')).toBe(4);
    });

    it('increment', () => {
      expect(trackSmartShuffle(0, 10, 'deal with increment 3')).toBe(0);
    });
  });

  describe('track multi shuffle', () => {
    describe('multi shuffle', () => {
      it('one', () => {
        const shuffles = `
          deal with increment 7
          deal into new stack
          deal into new stack
        `;

        expect(trackMultiShuffle(0, 10, shuffles)).toBe(0);
      });

      it('two', () => {
        const shuffles = `
          cut 6
          deal with increment 7
          deal into new stack
        `;

        expect(trackMultiShuffle(0, 10, shuffles)).toBe(1);
      });

      it('three', () => {
        const shuffles = `
          deal with increment 7
          deal with increment 9
          cut -2
        `;

        expect(trackMultiShuffle(0, 10, shuffles)).toBe(2);
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

        expect(trackMultiShuffle(0, 10, shuffles)).toBe(7);
      });
    });
  });
});
