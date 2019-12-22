import { program } from './input';
import { scan } from './lib';

(async function one() {
  const area: number = await scan(program, 50, 50);
  console.log('answer #20.1', area);
})();
