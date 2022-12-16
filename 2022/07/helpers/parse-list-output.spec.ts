import { parseListOutput } from './parse-list-output';

test('parses files and directories', () => {
  const output = ['187837 dzdfc.vqq', 'dir jlwtvf'];

  expect(parseListOutput(output)).toEqual([
    { type: 'file', name: 'dzdfc.vqq', size: 187_837 },
    { type: 'directory', name: 'jlwtvf' },
  ]);
});

test('throws if can not parse output', () => {
  const output = ['hello world'];
  const wrapper = () => parseListOutput(output);
  expect(wrapper).toThrowError();
});
