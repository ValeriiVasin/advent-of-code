import { getLines } from './get-lines';

const content = `
  hello
  world
`;

describe('get lines', () => {
  test('trimming disabled', () => {
    expect(getLines(content, { trim: false })).toEqual([
      '',
      '  hello',
      '  world',
      '',
    ]);
  });

  test('trim content, but not lines', () => {
    expect(
      getLines(content, { trim: { content: true, lines: false } }),
    ).toEqual(['  hello', '  world']);
  });

  test('trim lines, but not content', () => {
    expect(
      getLines(content, { trim: { content: false, lines: true } }),
    ).toEqual(['', 'hello', 'world', '']);
  });

  test('trim lines and content', () => {
    expect(getLines(content, { trim: true })).toEqual(['hello', 'world']);
  });

  test('trims content and lines by default', () => {
    expect(getLines(content)).toEqual(['hello', 'world']);
  });

  test('empty content', () => {
    expect(getLines('')).toEqual([]);
  });
});
