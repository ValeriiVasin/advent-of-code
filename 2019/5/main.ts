import { program } from './input';
import { run } from './lib';

(async function main() {
  console.log('#5.1', (await run([...program], [1])).output.pop());
  console.log('#5.2', (await run([...program], [5])).output.pop());
})();
