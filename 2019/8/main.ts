import { image } from './input';
import { toLayers, findLayer, countDigits } from './lib';

const layers = toLayers(image, { width: 25, height: 6 });
const layer = findLayer(layers);
console.log('answer #8.1', countDigits(layer, 1) * countDigits(layer, 2));
