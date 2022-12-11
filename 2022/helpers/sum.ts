export function sum(nums: Array<number>): number {
  return nums.reduce((acc, num) => acc + num, 0);
}
