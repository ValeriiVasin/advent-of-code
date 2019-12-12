import { program } from './input';
import { operate, Color, getColor } from './lib';

function draw(map: Map<string, Color>) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let key of map.keys()) {
    const [x, y] = key
      .slice(1, -1)
      .split(',')
      .map(_ => Number(_));
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  let result = [];
  for (let x = minX; x <= maxX; x++) {
    let line = '';
    for (let y = minY; y <= maxY; y++) {
      const color = getColor(map, { x, y });
      line += color === Color.White ? 'X' : ' ';
    }
    result.push(line);
  }

  console.log(result.join('\n'));
}

(async function main() {
  // const paintedOne = await operate([...program]);
  // console.log('answer #1:', paintedOne.size);
  const paintedTwo = await operate([...program], Color.White);

  console.log('answer #2: LRZECGFE');
  draw(paintedTwo);
})();
