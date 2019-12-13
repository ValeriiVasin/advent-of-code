import { Moon } from './types';

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
    moons = moons.map(moon => move(applyGravity(moon, moons)));
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
