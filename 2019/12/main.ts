import { totalEnergy, motion, universeLoop } from './lib';
import { moons } from './input';

console.log('answer #12.1: ', totalEnergy(motion(moons, 1000)));
console.log('answer #12.2: ', universeLoop(moons));
