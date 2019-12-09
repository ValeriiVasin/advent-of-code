import { program } from './input';
import { run } from '../5/lib';

(async function main() {
  const { output } = await run({ program: [...program], input: [1] });
  console.log('answer #9.1:', output[0]);
})();
