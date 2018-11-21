import * as React from 'react';
import { render } from 'react-dom';

function useTone(playing = false, type = 'square', frequency = 440, gain = 10) {
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

const App = () => {
  const [pitch, setPitch] = React.useState(440);
  const [gain, setGain] = React.useState(0.5);
  const [allPlaying, setAllPlaying] = React.useState(false);
  const [voice1Playing, setVoice1Playing] = React.useState(false);
  const [voice2Playing, setVoice2Playing] = React.useState(false);
  const [voice3Playing, setVoice3Playing] = React.useState(false);
  useTone(allPlaying || voice1Playing, 'sine', pitch, gain);
  useTone(allPlaying || voice2Playing, 'square', pitch * 1.5, gain);
  useTone(allPlaying || voice3Playing, 'sawtooth', pitch * 0.75, gain);
  return (
    <div>
      <input
        type="range"
        min="30"
        max="1500"
        value={pitch}
        onChange={e => setPitch(e.target.value)}
      />
      <button onClick={() => setVoice1Playing(!voice1Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setVoice2Playing(!voice2Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setVoice3Playing(!voice3Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setAllPlaying(!allPlaying)}>Play/Pause All</button>
      <div style={{ marginTop: 80 }}>
        <input
          type="range"
          style={{ transform: 'rotateZ(-90deg)' }}
          min="0"
          max="1.0"
          step="0.01"
          value={gain}
          onChange={e => setGain(e.target.value)}
        />
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
