const {
  createMap,
  orbitsCount,
  totalOrbitsCount,
  transfersCount,
} = require('./lib');

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

describe('paths', () => {
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
    'K)YOU',
    'I)SAN',
  ];
  const map = createMap(lines);

  it('count orbital transfers', () => {
    expect(transfersCount(map, 'YOU', 'SAN')).toBe(4);
  });
});
