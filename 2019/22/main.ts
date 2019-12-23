import { createDeck, multiShuffle } from './lib';
import { shuffles } from './input';

const deck = createDeck(10007);
const shuffledDeck = multiShuffle(deck, shuffles);
console.log('answer #22.1:', shuffledDeck.indexOf(2019));
