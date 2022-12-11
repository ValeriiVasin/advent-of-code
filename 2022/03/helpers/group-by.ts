export function groupBy(
  values: Array<string>,
  amount: number,
): Array<Array<string>> {
  const result: Array<Array<string>> = [];

  for (let i = 0; i < values.length; i += amount) {
    result.push(values.slice(i, i + amount));
  }

  return result;
}
