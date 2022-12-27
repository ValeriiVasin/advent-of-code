import { mirrorGridIndex } from './mirror-grid-index';

describe('mirror grid index', () => {
  const iLength = 4;
  const jLength = 5;

  test('mirror grid index with single element grid', () => {
    expect(mirrorGridIndex({ i: 0, j: 0, iLength: 1, jLength: 1 })).toEqual({
      i: 0,
      j: 0,
    });
  });

  test('top left', () => {
    expect(mirrorGridIndex({ i: 0, j: 0, iLength, jLength })).toEqual({
      i: iLength - 1,
      j: jLength - 1,
    });
  });

  test('top right', () => {
    expect(mirrorGridIndex({ i: 0, j: jLength - 1, iLength, jLength })).toEqual(
      {
        i: iLength - 1,
        j: 0,
      },
    );
  });

  test('bottom right', () => {
    expect(
      mirrorGridIndex({ i: iLength - 1, j: jLength - 1, iLength, jLength }),
    ).toEqual({
      i: 0,
      j: 0,
    });
  });

  test('bottom left', () => {
    expect(mirrorGridIndex({ i: iLength - 1, j: 0, iLength, jLength })).toEqual(
      {
        i: 0,
        j: jLength - 1,
      },
    );
  });

  test('middle index (non-square)', () => {
    expect(mirrorGridIndex({ i: 1, j: 2, iLength, jLength })).toEqual({
      i: 2,
      j: 2,
    });
  });

  test('middle index: square', () => {
    expect(mirrorGridIndex({ i: 2, j: 2, iLength: 5, jLength: 5 })).toEqual({
      i: 2,
      j: 2,
    });
  });
});
