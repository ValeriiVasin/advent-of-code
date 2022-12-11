import fs from 'fs';
import path from 'path';
import { getLines } from '../../helpers/get-lines';
import { sum } from '../../helpers/sum';
import { getGroupBadge } from './get-group-badge';
import { getPriority } from './get-priority';
import { groupBy } from './group-by';

export function getSecondResult(fixture: string): number {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../fixtures/${fixture}`),
    { encoding: 'utf8' },
  );

  return sum(groupBy(getLines(content), 3).map(getGroupBadge).map(getPriority));
}
