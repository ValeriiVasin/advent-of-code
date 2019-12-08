import { input } from './input';
import { getFuel, getTotalFuel } from './lib';

console.log(
  'answer #1.1',
  input.reduce((acc, mass) => acc + getFuel(mass), 0),
);

console.log(
  'answer #1.2',
  input.reduce((acc, mass) => acc + getTotalFuel(mass), 0),
);
