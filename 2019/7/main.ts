import { program } from './input';
import { findMaxSignal } from './lib';

(async function main() {
  console.log('answer #7.1', (await findMaxSignal(program)).signal);
})();
