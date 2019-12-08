import { program } from './input';
import { run } from './lib';

(async function main() {
  console.log(
    '#5.1',
    (await run({ program: [...program], input: [1] })).output.pop(),
  );
  console.log(
    '#5.2',
    (await run({ program: [...program], input: [5] })).output.pop(),
  );
})();
