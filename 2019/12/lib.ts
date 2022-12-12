import type { Moon } from './types';

const diff = (current: number, other: number) => {
  if (current === other) {
    return 0;
  }

  return current > other ? -1 : 1;
};

export const applyGravity = (moon: Moon, moons: Moon[]): Moon => {
  let { vx, vy, vz } = moon;

  for (let otherMoon of moons) {
    vx += diff(moon.x, otherMoon.x);
    vy += diff(moon.y, otherMoon.y);
    vz += diff(moon.z, otherMoon.z);
  }

  return { ...moon, vx, vy, vz };
};

export const move = (moon: Moon): Moon => {
  return {
    ...moon,
    x: moon.x + moon.vx,
    y: moon.y + moon.vy,
    z: moon.z + moon.vz,
  };
};

export const motion = (moons: Moon[], steps: number): Moon[] => {
  for (let i = 0; i < steps; i++) {
    moons = moons.map((moon) => move(applyGravity(moon, moons)));
  }

  return moons;
};

export const energy = (moon: Moon) => {
  const potential = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
  const kinetic = Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);

  return potential * kinetic;
};

export const totalEnergy = (moons: Moon[]) =>
  moons.reduce((acc, moon) => acc + energy(moon), 0);

const equalX = (a: Moon, b: Moon): boolean => a.x === b.x && a.vx === b.vx;
const equalY = (a: Moon, b: Moon): boolean => a.y === b.y && a.vy === b.vy;
const equalZ = (a: Moon, b: Moon): boolean => a.z === b.z && a.vz === b.vz;

const equals = (
  a: Moon[],
  b: Moon[],
  equal: (a: Moon, b: Moon) => boolean,
): boolean => {
  for (let i = 0; i < a.length; i++) {
    if (!equal(a[i], b[i])) {
      return false;
    }
  }

  return true;
};

interface Period {
  x: number;
  y: number;
  z: number;
}

// moons are turning in periods
// also they are turning in periods by axis
// to get the period of the universe we need to find periods per axis first
// and get `lowest common denominator` for all of them
const findPeriods = (moons: Moon[]): Period => {
  const original = moons;
  const period: Period = { x: 0, y: 0, z: 0 };
  let steps = 0;

  while (period.x === 0 || period.y === 0 || period.z === 0) {
    moons = motion(moons, 1);
    steps++;

    if (period.x === 0 && equals(moons, original, equalX)) {
      period.x = steps;
    }

    if (period.y === 0 && equals(moons, original, equalY)) {
      period.y = steps;
    }

    if (period.z === 0 && equals(moons, original, equalZ)) {
      period.z = steps;
    }
  }

  return period;
};

export const greatestCommonDivisor = (a: number, b: number): number => {
  if (a === 0) {
    return b;
  }

  return greatestCommonDivisor(b % a, a);
};

export const lowestCommonDenominator = (a: number, b: number): number => {
  return (a * b) / greatestCommonDivisor(a, b);
};

export const universeLoop = (moons: Moon[]): number => {
  const periods = findPeriods(moons);
  return lowestCommonDenominator(
    lowestCommonDenominator(periods.x, periods.y),
    periods.z,
  );
};
