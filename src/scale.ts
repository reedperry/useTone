import { keys } from './Piano';
export type Interval = number;
export type Scale = Interval[];
export const H: Interval = 1;
export const W: Interval = 2;

export const major: Scale = [W, W, H, W, W, W, H];
export const minor: Scale = [W, H, W, W, H, W, W];
const numPianoKeys = keys.length;

export function layoutScale(root: number, scale: Scale, range: number = numPianoKeys): number[] {
  const scaleSpread = scale.reduce((total, interval) => {
    return total + interval;
  }, 0);

  const repeats = Math.ceil(range / scaleSpread);

  let repeatedScale = scale;
  for (let i = 1; i < repeats; i++) {
    repeatedScale = repeatedScale.concat(scale);
  }

  const fullScale = repeatedScale.reduce(
    (scaleKeys, interval, i) => {
      scaleKeys.push(scaleKeys[i] + interval);
      return scaleKeys;
    },
    [root]
  );

  return fullScale.filter(keyIndex => keyIndex < root + range);
}
