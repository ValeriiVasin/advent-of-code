import { game, interactiveGame } from './lib';
import { program } from './input';

(async function main() {
  // console.log('answer #13.1:', await game([...program]));
  await interactiveGame([...program]);
})();
