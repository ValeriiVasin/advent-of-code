import { image } from './input';
import { toLayers, findLayer, countDigits, layersToImage } from './lib';

const layers = toLayers(image, { width: 25, height: 6 });
const layer = findLayer(layers);

console.log('answer #8.1', countDigits(layer, 1) * countDigits(layer, 2));

// to make it visible in the black console:
// - replace white color with spaces
// - replace black color with "▩"
// - join lines by \n
export const visualize = (layer: string[]): string =>
  layer
    .join('\n')
    .replace(/1/g, '▩')
    .replace(/0/g, ' ');

console.log('answer #8.2:');
console.log(visualize(layersToImage(layers)));
