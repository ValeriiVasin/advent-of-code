import { getLines } from './get-lines';

test('get lines: trims content and trims each line', () => {
  const input = `
    one
    two
    three
  `;

  expect(getLines(input)).toEqual(['one', 'two', 'three']);
});
