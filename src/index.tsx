import * as React from 'react';
import { render } from 'react-dom';

function useTone(playing, type = 'square', frequency = 440, gain = 10) {
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

interface ToneProps {
  play: boolean;
  pitch?: number;
  type?: string;
  gain?: number;
}

function Tone(props): React.SFC<ToneProps> {
  useTone(props.play, props.type, props.pitch, props.gain);
  return null;
}

const App = () => {
  const [pitch, setPitch] = React.useState(440);
  const [gain, setGain] = React.useState(0.5);
  const [allPlaying, setAllPlaying] = React.useState(false);
  const [voice1Playing, setVoice1Playing] = React.useState(false);
  const [voice2Playing, setVoice2Playing] = React.useState(false);
  const [voice3Playing, setVoice3Playing] = React.useState(false);

  return (
    <div>
      <input
        type="range"
        min="30"
        max="1500"
        value={pitch}
        onChange={e => setPitch(e.target.value)}
      />
      <Tone
        play={allPlaying || voice1Playing}
        type="sine"
        pitch={pitch}
        gain={gain}
      />
      <Tone
        play={allPlaying || voice2Playing}
        type="square"
        pitch={pitch * 1.5}
        gain={gain}
      />
      <Tone
        play={allPlaying || voice3Playing}
        type="sawtooth"
        pitch={pitch * 0.75}
        gain={gain}
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
