import { fft } from './lib';
import { input } from './input';

console.log('output #16.1:', fft(input, 100).slice(0, 8));
