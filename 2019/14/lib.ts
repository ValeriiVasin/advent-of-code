/**
 * @TODO rewrite to proper conversion algorithm
 */

export interface ReactionItem {
  name: string;
  amount: number;
}

export interface Reaction {
  input: ReactionItem[];
  output: ReactionItem;
}

export type ReactionList = Map<string, Reaction | null>;

export const parseReactionItem = (item: string): ReactionItem => {
  const [amount, name] = item.split(' ');
  return { name, amount: Number(amount) };
};

export const parseReaction = (reaction: string): Reaction => {
  const [input, output] = reaction.split('=>');
  return {
    input: input.trim().split(', ').map(parseReactionItem),
    output: parseReactionItem(output.trim()),
  };
};

export const parseReactionsList = (list: string) => {
  const map: ReactionList = new Map([['ORE', null]]);

  for (let line of list.trim().split('\n')) {
    const reaction: Reaction = parseReaction(line);
    map.set(reaction.output.name, reaction);
  }

  return map;
};

const getLevels = (list: ReactionList): Map<string, number> => {
  const levels = new Map<string, number>();

  for (let [name] of list) {
    getLevel(list, name, levels);
  }

  return levels;
};

const getLevel = (
  list: ReactionList,
  name: string,
  levels: Map<string, number>,
): number => {
  const cachedLevel = levels.get(name);
  if (cachedLevel) {
    return cachedLevel;
  }

  if (name === 'ORE') {
    levels.set('ORE', 0);
    return 0;
  }

  const reaction = list.get(name);

  if (!reaction) {
    throw new Error(`Unknown reaction: ${name}`);
  }

  const level =
    1 +
    Math.max(
      ...reaction.input.map((item) => getLevel(list, item.name, levels)),
    );

  levels.set(name, level);
  return level;
};

const pick = (
  items: Map<string, number>,
  levels: Map<string, number>,
): string => {
  let maxName: string = '';
  let maxLevel = -Infinity;

  for (let name of items.keys()) {
    const level = levels.get(name) ?? -Infinity;
    if (level > maxLevel) {
      maxLevel = level;
      maxName = name;
    }
  }

  return maxName;
};

const react = (
  list: ReactionList,
  items: Map<string, number>,
  name: string,
): boolean => {
  const reaction = list.get(name);

  if (!reaction) {
    return false;
  }

  const amount = items.get(name);

  if (typeof amount === 'undefined') {
    return false;
  }

  items.delete(name);
  const { input, output } = reaction;
  const times = Math.ceil(amount / output.amount);

  for (let item of input) {
    const name = item.name;
    const neededAmount = item.amount * times;

    const amount = items.get(name);
    items.set(name, amount ? amount + neededAmount : neededAmount);
  }

  return true;
};

export const toOre = (list: ReactionList, item: ReactionItem) => {
  const levels = getLevels(list);
  let items = new Map<string, number>([[item.name, item.amount]]);
  let done = false;

  while (!done) {
    const name = pick(items, levels);
    done = !react(list, items, name);
  }

  return items.get('ORE') ?? 0;
};

export const toFuel = (list: ReactionList, ore: number): number => {
  let lo = 1;
  let hi = ore;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const fuelOre = toOre(list, { name: 'FUEL', amount: mid });

    if (fuelOre > ore) {
      hi = mid - 1;
      continue;
    }

    lo = mid + 1;
  }

  return hi;
};
