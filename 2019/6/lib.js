function createMap(lines) {
  const map = new Map([['COM', null]]);

  for (let line of lines) {
    const [parent, child] = line.split(')');
    map.set(child, parent);
  }

  return map;
}

function orbitsCount(map, object) {
  let count = -1;

  while (object) {
    count++;
    object = map.get(object);
  }

  return count;
}

function totalOrbitsCount(map) {
  let count = 0;

  for (let orbit of map.keys()) {
    count += orbitsCount(map, orbit);
  }

  return count;
}

module.exports = {
  orbitsCount,
  createMap,
  totalOrbitsCount,
};
