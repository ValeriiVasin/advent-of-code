import { program } from './input';
import { findMaxSignal, Mode } from './lib';

(async function main() {
  console.log('answer #7.1', (await findMaxSignal(program)).signal);
  console.log(
    'answer #7.2',
    (await findMaxSignal(program, Mode.FeedbackLoop)).signal,
  );
})();
