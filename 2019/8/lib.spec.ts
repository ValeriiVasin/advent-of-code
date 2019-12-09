import {
  toLayers,
  findLayer,
  countDigits,
  pixelColor,
  Color,
  layersToImage,
} from './lib';

test('toLayers', () => {
  expect(toLayers('123456789012', { width: 3, height: 2 })).toEqual([
    ['123', '456'],
    ['789', '012'],
  ]);
});

test('count digits', () => {
  const layer = ['133', '456'];

  expect(countDigits(layer, 1)).toBe(1);
  expect(countDigits(layer, 2)).toBe(0);
  expect(countDigits(layer, 3)).toBe(2);
});

test('find layer', () => {
  const layers = toLayers('123456789012', {
    width: 3,
    height: 2,
  });

  expect(findLayer(layers)).toEqual(['123', '456']);
});

test('pixel color', () => {
  const layers = toLayers('0222112222120000', {
    width: 2,
    height: 2,
  });

  expect(pixelColor(layers, { row: 0, col: 0 })).toBe(Color.Black);
  expect(pixelColor(layers, { row: 0, col: 1 })).toBe(Color.White);
  expect(pixelColor(layers, { row: 1, col: 0 })).toBe(Color.White);
  expect(pixelColor(layers, { row: 1, col: 1 })).toBe(Color.Black);
});

test('layers to image', () => {
  const layers = toLayers('0222112222120000', {
    width: 2,
    height: 2,
  });

  expect(layersToImage(layers)).toEqual(['01', '10']);
});
