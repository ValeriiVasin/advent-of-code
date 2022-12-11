export function getGroupBadge(group: Array<string>): string {
  const resultSet = group
    .map((value) => new Set(value))
    .reduce((a, b) => intersection(a, b));
  const resultArray = [...resultSet];
  const first = resultArray[0];

  if (typeof first === 'undefined') {
    throw new Error('Badge not found');
  }

  return first;
}

function intersection(setA: Set<string>, setB: Set<string>): Set<string> {
  const result = new Set<string>();

  for (const char of setA) {
    if (setB.has(char)) {
      result.add(char);
    }
  }

  return result;
}
