const input = require('./input');
const { createMap, totalOrbitsCount } = require('./lib');

const map = createMap(input);
console.log('answer #6.1', totalOrbitsCount(map));
