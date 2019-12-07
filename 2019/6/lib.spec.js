const { createMap, orbitsCount, totalOrbitsCount } = require('./lib');

describe('orbits count', () => {
  const lines = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
  ];
  let map;

  beforeEach(() => {
    map = createMap(lines);
  });

  it('counts orbits correct', () => {
    expect(orbitsCount(map, 'D')).toBe(3);
    expect(orbitsCount(map, 'L')).toBe(7);
    expect(orbitsCount(map, 'COM')).toBe(0);
  });

  it('total orbits', () => {
    expect(totalOrbitsCount(map)).toBe(42);
  });
});
