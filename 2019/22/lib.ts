export const reverse = (deck: number[]): number[] => {
  return [...deck].reverse();
};

export const cut = (deck: number[], positions: number): number[] => {
  if (positions === 0) {
    return deck;
  }

  if (positions < 0) {
    positions = deck.length + positions;
  }

  return [...deck.slice(positions), ...deck.slice(0, positions)];
};

export const increment = (deck: number[], inc: number): number[] => {
  const result: number[] = Array(deck.length);
  let position = 0;

  for (let card of deck) {
    result[position] = card;

    position += inc;
    if (position >= deck.length) {
      position -= deck.length;
    }
  }

  return result;
};

export const smartShuffle = (deck: number[], shuffle: string): number[] => {
  if (shuffle === 'deal into new stack') {
    return reverse(deck);
  }

  if (shuffle.startsWith('cut')) {
    const positions = Number(shuffle.replace('cut ', ''));
    return cut(deck, positions);
  }

  if (shuffle.startsWith('deal with increment')) {
    const inc = Number(shuffle.replace('deal with increment ', ''));
    return increment(deck, inc);
  }

  return deck;
};

export const multiShuffle = (deck: number[], shuffles: string): number[] => {
  const parsedShuffles = shuffles
    .trim()
    .split('\n')
    .map(_ => _.trim());

  for (let shuffle of parsedShuffles) {
    deck = smartShuffle(deck, shuffle);
  }

  return deck;
};

export const createDeck = (cards: number): number[] =>
  Array.from(Array(cards), (_, index) => index);
