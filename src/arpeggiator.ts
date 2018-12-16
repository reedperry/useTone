/**
 * TODO Maybe this should guarantee using everything in `notes` at least once?
 * 
 * Generate a random arpeggio of a given length, from a list of possible notes
 * @param notes The notes to select from
 * @param length The total length of the generated arpeggio
 * @returns A random arpeggio of given length, selecting from the given notes
 */
export function randomArp(notes: number[], length: number): number[] {
  if (length === 0) {
    return [];
  }

  let arp: number[] = [notes[0]];

  while (arp.length < length) {
    arp.push(notes[Math.floor(Math.random() * notes.length)]);
  }

  return arp;
}

export function ascendingArp(notes: number[], length: number): number[] {
  const ascendingNotes = notes.slice().sort((a, b) => a - b);
  return repeatingSequence(ascendingNotes, length);
}

export function descendingArp(notes: number[], length: number): number[] {
  const descendingNotes = notes.slice().sort((a, b) => a - b).reverse();
  return repeatingSequence(descendingNotes, length);
}

/**
 * Repeat a sequence until we get to a given total length
 * @param seq The sequence to repeat
 * @param length The total length of sequence to create
 * @returns The sequence, repeated until reaching exactly the given length
 */
function repeatingSequence(seq: number[], length: number): number[] {
  if (length <= 0) {
    return [];
  }

  let arp: number[] = [];

  while (arp.length < length) {
    arp = arp.concat(seq);
  }

  arp.length = length;

  return arp;
}

// Later...
function withProbability(prob: number): any {
  return prob;
}
