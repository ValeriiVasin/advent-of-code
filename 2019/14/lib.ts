export interface ReactionItem {
  name: string;
  amount: number;
}

export interface Reaction {
  input: ReactionItem[];
  output: ReactionItem;
}

export type ReactionList = Map<string, Reaction>;

export const parseReactionItem = (item: string): ReactionItem => {
  const [amount, name] = item.split(' ');
  return { name, amount: Number(amount) };
};

export const parseReaction = (reaction: string): Reaction => {
  const [input, output] = reaction.split('=>');
  return {
    input: input
      .trim()
      .split(', ')
      .map(parseReactionItem),
    output: parseReactionItem(output.trim()),
  };
};

export const parseReactionsList = (list: string) => {
  const map: ReactionList = new Map<string, Reaction>([['ORE', null]]);

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
  if (levels.has(name)) {
    return levels.get(name);
  }

  if (name === 'ORE') {
    levels.set('ORE', 0);
    return 0;
  }

  const level =
    1 +
    Math.max(
      ...list.get(name).input.map(item => getLevel(list, item.name, levels)),
    );

  levels.set(name, level);
  return level;
};

const pick = (
  items: Map<string, number>,
  levels: Map<string, number>,
): string => {
  let maxName: string;
  let maxLevel = -Infinity;

  for (let name of items.keys()) {
    const level = levels.get(name);
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
  items.delete(name);
  const { input, output } = reaction;
  const times = Math.ceil(amount / output.amount);

  for (let item of input) {
    const name = item.name;
    const neededAmount = item.amount * times;

    items.set(
      name,
      items.has(name) ? items.get(name) + neededAmount : neededAmount,
    );
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

  return items.get('ORE');
};
