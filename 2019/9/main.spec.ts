import { program } from './input';
import { run } from '../5/lib';

test('program outputs only one code in test mode', async () => {
  expect.assertions(1);
  const { output } = await run({ program, input: [1] });
  expect(output.length).toBe(1);
});
