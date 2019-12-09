function split(str: string, length: number): string[] {
  const result: string[] = [];

  for (let start = 0; start < str.length; start += length) {
    result.push(str.slice(start, start + length));
  }

  return result;
}

export const toLayers = (
  image: string,
  { width, height }: { width: number; height: number },
): Array<string[]> => {
  const layers = split(image, width * height);
  return layers.map(layer => split(layer, width));
};

export const countDigits = (layer: string[], digit: number): number => {
  const digitChar = String(digit);
  let count = 0;

  for (let str of layer) {
    for (let char of str) {
      if (char === digitChar) {
        count++;
      }
    }
  }

  return count;
};

export const findLayer = (layers: Array<string[]>): string[] => {
  let minLayer = layers[0];
  let min = countDigits(minLayer, 0);

  for (let layer of layers) {
    const count = countDigits(layer, 0);
    if (count < min) {
      min = count;
      minLayer = layer;
    }
  }

  return minLayer;
};
