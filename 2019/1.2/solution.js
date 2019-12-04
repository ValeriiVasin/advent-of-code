const getFuel = mass => Math.floor(mass / 3) - 2;

const getTotalFuel = mass => {
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

const checks = [
  { mass: 14, expected: 2 },
  { mass: 1969, expected: 966 },
  { mass: 100756, expected: 50346 },
];

for (let { mass, expected } of checks) {
  const fuel = getTotalFuel(mass);
  console.assert(
    fuel === expected,
    `check failed. Input: ${mass}; Output: ${fuel}; Expected: ${expected}`,
  );
}

const input = `
  106001
  131342
  51187
  87791
  68636
  109091
  111888
  98012
  90713
  54284
  143884
  121856
  117199
  77883
  132628
  123828
  56939
  50447
  77110
  103272
  148181
  59323
  98249
  110065
  144277
  108204
  92138
  54449
  108098
  119292
  65720
  136053
  116987
  78305
  143302
  145067
  106633
  90519
  58970
  57090
  77334
  55929
  95983
  139236
  62634
  89275
  113296
  59530
  114159
  98407
  120607
  84394
  91151
  135965
  56157
  114073
  95274
  75259
  60582
  136361
  54771
  53286
  70491
  131915
  114306
  120749
  117462
  86194
  112412
  140705
  72377
  113646
  145304
  60811
  127560
  78769
  99205
  127236
  136099
  69166
  141727
  115973
  100845
  90494
  62209
  85841
  116591
  78406
  140341
  139849
  55119
  64092
  58439
  52273
  51742
  57258
  95120
  138764
  106361
  82104
`
  .trim()
  .split('\n')
  .map(_ => Number(_));

const answer = input.reduce((acc, mass) => acc + getTotalFuel(mass), 0);
console.log('answer: ', answer);
