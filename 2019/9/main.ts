import { program } from './input';
import { run } from '../5/lib';

(async function main() {
  const { output: outputOne } = await run({
    program: [...program],
    input: [1],
  });
  console.log('answer #9.1:', outputOne[0]);

  const { output: outputTwo } = await run({
    program: [...program],
    input: [2],
  });
  console.log('answer #9.2:', outputTwo[0]);
})();
