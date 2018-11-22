import * as React from 'react';

export type ToneType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export default function useTone(
  playing: boolean,
  type: ToneType = 'square',
  frequency: number = 440,
  gain: number = 0.5
) {
  const gainNode = React.useRef(null);
  const osc = React.useRef(null);
  const audioContext = React.useRef(null);

  React.useEffect(() => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);
    const oscillator = audioContext.current.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    oscillator.start(0);

    osc.current = oscillator;

    return () => {
      osc.current.stop(0);
      osc.current.disconnect();
    };
  }, []);

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
