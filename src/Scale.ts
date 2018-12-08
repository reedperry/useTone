export type Interval = number;
export type Scale = Interval[];
export const H: Interval = 1;
export const W: Interval = 2;

const major: Scale = [W, W, H, W, W, W, H];
const minor: Scale = [W, H, W, W, H, W, W];
const numPianoKeys = 43; // for now...

export function layoutScale(root: number, scale: Scale): number[] {
  const scaleSpread = scale.reduce((total, interval) => {
    return total + interval;
  }, 0);

  const repeats = Math.ceil(numPianoKeys / scaleSpread);

  let repeatedScale = scale;
  for (let i = 1; i < repeats; i++) {
    repeatedScale = repeatedScale.concat(scale);
  }

  const fullScale = repeatedScale.reduce(
    (keys, interval, i) => {
      keys.push(keys[i] + interval);
      return keys;
    },
    [root]
  );

  return fullScale.filter(keyIndex => keyIndex < numPianoKeys);
}

console.log(layoutScale(0, major));
console.log(layoutScale(0, minor));
