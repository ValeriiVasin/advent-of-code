export enum Color {
  Black,
  White,
  Transparent,
}

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
  return layers.map((layer) => split(layer, width));
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

export const pixelColor = (
  layers: Array<string[]>,
  { row, col }: { row: number; col: number },
): Color => {
  const black = String(Color.Black);
  const white = String(Color.White);

  for (let layer of layers) {
    const char = layer[row][col];

    if (char === black) {
      return Color.Black;
    }

    if (char === white) {
      return Color.White;
    }
  }

  return Color.Transparent;
};

export const layersToImage = (layers: Array<string[]>): string[] => {
  const height = layers[0].length;
  const width = layers[0][0].length;
  const result: string[] = [];

  for (let row = 0; row < height; row++) {
    let line: string = '';
    for (let col = 0; col < width; col++) {
      line += String(pixelColor(layers, { row, col }));
    }
    result.push(line);
  }

  return result;
};
