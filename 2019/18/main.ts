import { input } from './input';
import { parse, game } from './lib';

const map = parse(input);
console.log('answer #18.1:', game(map).steps);
