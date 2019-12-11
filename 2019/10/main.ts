import { input } from './input';
import { parseInput, findBestAsteroid } from './lib';

const points = parseInput(input);
console.log('answer #10.1:', findBestAsteroid(points).viewable);
