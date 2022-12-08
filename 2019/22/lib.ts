export const reverse = (deck: number[]): number[] => {
  return [...deck].reverse();
};

export const trackReverse = (position: number, deckSize: number): number => {
  return deckSize - position - 1;
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

export const trackCut = (
  position: number,
  deckSize: number,
  positions: number,
): number => {
  if (positions === 0) {
    return position;
  }

  if (positions < 0) {
    positions = deckSize + positions;
  }

  // outside
  if (position >= positions) {
    return position - positions;
  }

  return deckSize - positions + position;
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

export const trackIncrement = (
  position: number,
  deckSize: number,
  inc: number,
): number => (position * inc) % deckSize;

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

export const trackSmartShuffle = (
  position: number,
  deckSize: number,
  shuffle: string,
): number => {
  if (shuffle === 'deal into new stack') {
    return trackReverse(position, deckSize);
  }

  if (shuffle.startsWith('cut')) {
    const positions = Number(shuffle.replace('cut ', ''));
    return trackCut(position, deckSize, positions);
  }

  if (shuffle.startsWith('deal with increment')) {
    const inc = Number(shuffle.replace('deal with increment ', ''));
    return trackIncrement(position, deckSize, inc);
  }

  return position;
};

export const multiShuffle = (deck: number[], shuffles: string): number[] => {
  const parsedShuffles = shuffles
    .trim()
    .split('\n')
    .map((_) => _.trim());

  for (let shuffle of parsedShuffles) {
    deck = smartShuffle(deck, shuffle);
  }

  return deck;
};

export const trackMultiShuffle = (
  position: number,
  deckSize: number,
  shuffles: string,
  times: number = 1,
): number => {
  const parsedShuffles = shuffles
    .trim()
    .split('\n')
    .map((_) => _.trim());

  for (let i = 0; i < times; i++) {
    for (let shuffle of parsedShuffles) {
      position = trackSmartShuffle(position, deckSize, shuffle);
    }
  }

  return position;
};

export const createDeck = (cards: number): number[] =>
  Array.from(Array(cards), (_, index) => index);
