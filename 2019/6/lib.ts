export type OrbitMap = Map<string, null | string>;

export function createMap(lines: string[]): OrbitMap {
  const map: OrbitMap = new Map([['COM', null]]);

  for (let line of lines) {
    const [parent, child] = line.split(')');
    map.set(child, parent);
  }

  return map;
}

function pathToCenter(map: OrbitMap, from: string): string[] {
  const path = [];
  let _from: string | null | undefined = map.get(from);

  while (_from) {
    path.push(_from);
    _from = map.get(_from);
  }

  return path;
}

export function orbitsCount(map: OrbitMap, object: string): number {
  return pathToCenter(map, object).length;
}

export function totalOrbitsCount(map: OrbitMap) {
  let count = 0;

  for (let orbit of map.keys()) {
    count += orbitsCount(map, orbit);
  }

  return count;
}

export function transfersCount(map: OrbitMap, from: string, to: string) {
  const fromPath = pathToCenter(map, from);
  const toPath = pathToCenter(map, to);

  while (fromPath[fromPath.length - 1] === toPath[toPath.length - 1]) {
    fromPath.pop();
    toPath.pop();
  }

  return fromPath.length + toPath.length;
}
