import * as React from 'react';

export type ToneType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export default function useTone(
  playing: boolean,
  type: ToneType = 'square',
  frequency: number = 440,
  gain: number = 0.5
) {
  const audioContext = React.useRef(new (AudioContext || (window as any).webkitAudioContext)());
  const gainNode = React.useRef(audioContext.current.createGain());
  const osc = React.useRef(audioContext.current.createOscillator());

  React.useEffect(() => {
    // audioContext.current = new (window.AudioContext ||
    //   (window as any).webkitAudioContext)();
    // gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);
    // const oscillator = audioContext.current.createOscillator();
    osc.current.frequency.value = frequency;
    osc.current.type = type;
    osc.current.start(0);

    return () => {
      osc.current.stop(0);
      osc.current.disconnect();
    };
  },
  []);

  React.useEffect(
    () => {
      osc.current.frequency.value = frequency;
      osc.current.type = type;
      gainNode.current.gain.value = gain;
    },
    [type, frequency, gain]
  );

  React.useEffect(
    () => {
      if (playing) {
        osc.current.connect(gainNode.current);
      } else {
        osc.current.disconnect();
      }
    },
    [playing]
  );
}
