import { one, two } from './fixtures';
import { applyGravity, move, motion, energy, totalEnergy } from './lib';
import { Moon } from './types';

it('gravity', () => {
  const [first] = one;

  expect(applyGravity(first, one)).toEqual({
    x: -1,
    y: 0,
    z: 2,
    vx: 3,
    vy: -1,
    vz: -1,
  });
});

it('move', () => {
  const moon: Moon = {
    x: -1,
    y: 0,
    z: 2,
    vx: 3,
    vy: -1,
    vz: -1,
  };

  expect(move(moon)).toEqual({
    x: 2,
    y: -1,
    z: 1,
    vx: 3,
    vy: -1,
    vz: -1,
  });
});

it('motion', () => {
  expect(motion(one, 10)).toEqual([
    { x: 2, y: 1, z: -3, vx: -3, vy: -2, vz: 1 },
    { x: 1, y: -8, z: 0, vx: -1, vy: 1, vz: 3 },
    { x: 3, y: -6, z: 1, vx: 3, vy: 2, vz: -3 },
    { x: 2, y: 0, z: 4, vx: 1, vy: -1, vz: -1 },
  ]);
});

it('energy', () => {
  expect(energy({ x: 2, y: 1, z: -3, vx: -3, vy: -2, vz: 1 })).toBe(36);
});

it('total energy', () => {
  expect(
    totalEnergy([
      { x: 2, y: 1, z: -3, vx: -3, vy: -2, vz: 1 },
      { x: 1, y: -8, z: 0, vx: -1, vy: 1, vz: 3 },
      { x: 3, y: -6, z: 1, vx: 3, vy: 2, vz: -3 },
      { x: 2, y: 0, z: 4, vx: 1, vy: -1, vz: -1 },
    ]),
  ).toBe(179);
});

it('example #1', () => {
  expect(totalEnergy(motion(one, 10))).toBe(179);
});

it('example #2', () => {
  expect(totalEnergy(motion(two, 100))).toBe(1940);
});
