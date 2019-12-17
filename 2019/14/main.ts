import { input } from './input';
import { toOre, parseReactionsList, toFuel } from './lib';

console.log(
  'answer #14.1',
  toOre(parseReactionsList(input), { name: 'FUEL', amount: 1 }),
);

console.log('answer #14.2', toFuel(parseReactionsList(input), 1000000000000));
