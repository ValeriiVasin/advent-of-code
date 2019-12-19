import { parseInput, getPattern, fft, realFFT } from './lib';

test('parsing input', () => {
  expect(parseInput('123')).toEqual([1, 2, 3]);
});

describe('pattern', () => {
  it('is correct', () => {
    expect(getPattern({ length: 5, repeat: 1 })).toEqual([1, 0, -1, 0, 1]);
  });

  it('supports repeat', () => {
    expect(getPattern({ length: 7, repeat: 2 })).toEqual([
      0,
      1,
      1,
      0,
      0,
      -1,
      -1,
    ]);
  });
});

describe('fft', () => {
  it('works', () => {
    expect(fft('12345678')).toBe('48226158');
    expect(fft('12345678', 2)).toBe('34040438');
    expect(fft('12345678', 3)).toBe('03415518');
    expect(fft('12345678', 4)).toBe('01029498');
  });

  it('#1', () => {
    expect(fft('80871224585914546619083218645595', 100).slice(0, 8)).toBe(
      '24176176',
    );
  });

  it('#2', () => {
    expect(fft('19617804207202209144916044189917', 100).slice(0, 8)).toBe(
      '73745418',
    );
  });

  it('#3', () => {
    expect(fft('69317163492948606335995924319873', 100).slice(0, 8)).toBe(
      '52432133',
    );
  });
});

describe('real fft', () => {
  it.only('#1', () => {
    expect(realFFT('03036732577212944063491565474664')).toBe('84462026');
  });

  it('#2', () => {
    expect(fft('19617804207202209144916044189917', 100).slice(0, 8)).toBe(
      '73745418',
    );
  });

  it('#3', () => {
    expect(fft('69317163492948606335995924319873', 100).slice(0, 8)).toBe(
      '52432133',
    );
  });
});
