import { input } from './input';
import { parseInput, findBestAsteroid, vaporize, Point } from './lib';

const points = parseInput(input);
const best = findBestAsteroid(points);
console.log('answer #10.1:', best.viewable);

const vaporized = vaporize(best.point, points);
const betPoint: Point = vaporized[199];
console.log('answer #10.2', betPoint.x * 100 + betPoint.y);
