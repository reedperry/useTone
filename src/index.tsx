import * as React from 'react';
import { render } from 'react-dom';

function useTone(type = 'square', frequency = 440, gain = 10) {
  const [playing, setPlaying] = React.useState(false);
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
      osc.current.stop();
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

  return [playing, setPlaying];
}

const App = () => {
  const [pitch, setPitch] = React.useState(440);
  const [gain, setGain] = React.useState(10);
  const [sinePlaying, sineSetPlaying] = useTone('sine', pitch, gain);
  const [squarePlaying, squareSetPlaying] = useTone(
    'square',
    pitch * 1.5,
    gain
  );
  const [square2Playing, square2SetPlaying] = useTone(
    'square',
    pitch * 0.75,
    gain
  );
  return (
    <div>
      <input
        type="range"
        min="60"
        max="3000"
        value={pitch}
        onChange={e => setPitch(e.target.value)}
      />
      <button onClick={() => sineSetPlaying(!sinePlaying)}>Play/Pause</button>
      <button onClick={() => squareSetPlaying(!squarePlaying)}>
        Play/Pause
      </button>
      <button onClick={() => square2SetPlaying(!square2Playing)}>
        Play/Pause
      </button>
      <div style={{ marginTop: 80 }}>
        <input
          type="range"
          style={{ transform: 'rotateZ(-90deg)' }}
          min="0"
          max="100"
          value={gain}
          onChange={e => setGain(e.target.value)}
        />
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
