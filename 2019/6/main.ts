import { input } from './input';
import { createMap, totalOrbitsCount, transfersCount } from './lib';

const map = createMap(input);
console.log('answer #6.1', totalOrbitsCount(map));
console.log('answer #6.2', transfersCount(map, 'YOU', 'SAN'));
