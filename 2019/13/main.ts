import { game } from './lib';
import { program } from './input';

(async function main() {
  console.log('answer #13.1:', await game(program));
})();
