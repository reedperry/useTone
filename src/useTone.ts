import * as React from 'react';

export default function useTone(
  playing: boolean,
  type: OscillatorType = 'square',
  frequency: number = 440,
  gain: number = 0.5
) {
  const audioContext = React.useRef<AudioContext | null>(null);
  const gainNode = React.useRef<GainNode | null>(null);
  const osc = React.useRef<OscillatorNode | null>(null);

  React.useEffect(() => {
    audioContext.current = new (AudioContext ||
      (window as any).webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);
    const oscillator = audioContext.current.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    oscillator.start(0);

    osc.current = oscillator;

    return () => {
      if (osc.current) {
        osc.current.stop(0);
        osc.current.disconnect();
      }
    };
  }, []);

  React.useEffect(
    () => {
      if (osc.current && gainNode.current) {
        osc.current.frequency.value = frequency;
        osc.current.type = type;
        gainNode.current.gain.value = gain;
      }
    },
    [type, frequency, gain]
  );

  React.useEffect(
    () => {
      if (playing && osc.current && gainNode.current) {
        osc.current.connect(gainNode.current);
      } else if (osc.current) {
        osc.current.disconnect();
      }
    },
    [playing]
  );
}
