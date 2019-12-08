export const getFuel = (mass: number) => Math.floor(mass / 3) - 2;

export const getTotalFuel = (mass: number) => {
  let result = 0;

  while (true) {
    const fuel = getFuel(mass);

    if (fuel <= 0) {
      return result;
    }

    result += fuel;
    mass = fuel;
  }
};
