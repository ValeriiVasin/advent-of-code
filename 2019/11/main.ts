import { program } from './input';
import { operate } from './lib';

(async function main() {
  const painted = await operate(program);
  console.log('answer #1:', painted.size);
})();
