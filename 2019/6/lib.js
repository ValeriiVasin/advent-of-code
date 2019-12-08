function createMap(lines) {
  const map = new Map([['COM', null]]);

  for (let line of lines) {
    const [parent, child] = line.split(')');
    map.set(child, parent);
  }

  return map;
}

function pathToCenter(map, from) {
  const path = [];

  while ((from = map.get(from))) {
    path.push(from);
  }

  return path;
}

function orbitsCount(map, object) {
  return pathToCenter(map, object).length;
}

function totalOrbitsCount(map) {
  let count = 0;

  for (let orbit of map.keys()) {
    count += orbitsCount(map, orbit);
  }

  return count;
}

function transfersCount(map, from, to) {
  const fromPath = pathToCenter(map, from);
  const toPath = pathToCenter(map, to);

  while (fromPath[fromPath.length - 1] === toPath[toPath.length - 1]) {
    fromPath.pop();
    toPath.pop();
  }

  return fromPath.length + toPath.length;
}

module.exports = {
  orbitsCount,
  createMap,
  totalOrbitsCount,
  transfersCount,
};
