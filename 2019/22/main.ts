import { createDeck, multiShuffle, trackMultiShuffle } from './lib';
import { shuffles } from './input';

(function one() {
  const deck = createDeck(10007);
  const shuffledDeck = multiShuffle(deck, shuffles);
  console.log('answer #22.1:', shuffledDeck.indexOf(2019));
  console.log(
    'answer #22.1 (via track)',
    trackMultiShuffle(2019, 10007, shuffles),
  );
})();

(function two() {
  let position = 2020;
  const times = 101_741_582_076_661;
  const deckSize = 119_315_717_514_047;

  console.log(
    'answer #22.2',
    trackMultiShuffle(position, deckSize, shuffles, times),
  );
})();
