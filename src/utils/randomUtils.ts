/**
 * min ≤ r ≤ max
 * @param min 最小数
 * @param max 最大数
 * @constructor
 */
export function RandomNumBoth(min: number, max: number): number {
  const Range = max - min;
  const Rand = Math.random();
  //四舍五入
  return min + Math.round(Rand * Range);
}
