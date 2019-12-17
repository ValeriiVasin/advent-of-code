import { input } from './input';
import { toOre, parseReactionsList } from './lib';

console.log(
  'answer #14.1',
  toOre(parseReactionsList(input), { name: 'FUEL', amount: 1 }),
);
