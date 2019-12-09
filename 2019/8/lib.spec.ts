import { toLayers, findLayer, countDigits } from './lib';

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
