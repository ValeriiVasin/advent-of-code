import { program } from './input';
import { run } from './lib';

console.log('#5.1', run([...program], [1]).output.pop());
console.log('#5.2', run([...program], [5]).output.pop());
