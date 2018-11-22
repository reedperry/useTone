import * as React from 'react';
import { render } from 'react-dom';
import useTone, { ToneType } from './useTone';

interface ToneProps {
  play: boolean;
  pitch?: number;
  type?: ToneType;
  gain?: number;
}

function Tone(props): React.SFC<ToneProps> {
  useTone(props.play, props.type, props.pitch, props.gain);
  return null;
}

const App = () => {
  const [pitch, setPitch] = React.useState(200);
  const [gain, setGain] = React.useState(0.5);
  const [allPlaying, setAllPlaying] = React.useState(false);
  const [voice1Playing, setVoice1Playing] = React.useState(false);
  const [voice2Playing, setVoice2Playing] = React.useState(false);
  const [voice3Playing, setVoice3Playing] = React.useState(false);
  const [voice4Playing, setVoice4Playing] = React.useState(false);

  const tones: ToneProps = [
    { playing: voice1Playing, type: 'sine', pitch, gain },
    { playing: voice2Playing, type: 'sawtooth', pitch: pitch * 1.57, gain },
    { playing: voice3Playing, type: 'triangle', pitch: pitch * 1.33, gain },
    { playing: voice4Playing, type: 'square', pitch: pitch * 0.67, gain }
  ];

  return (
    <div>
      <input
        type="range"
        min="10"
        max="1200"
        value={pitch}
        onChange={e => setPitch(e.target.value)}
      />
      {tones.map(tone => (
        <Tone
          play={allPlaying || tone.playing}
          type={tone.type}
          pitch={tone.pitch}
          gain={tone.gain}
        />
      ))}
      <button onClick={() => setVoice1Playing(!voice1Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setVoice2Playing(!voice2Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setVoice3Playing(!voice3Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setVoice4Playing(!voice4Playing)}>
        Play/Pause
      </button>
      <button onClick={() => setAllPlaying(!allPlaying)}>Play/Pause All</button>
      <div style={{ marginTop: 80 }}>
        <input
          type="range"
          style={{ transform: 'rotateZ(-90deg)' }}
          min="0"
          max="0.5"
          step="0.01"
          value={gain}
          onChange={e => setGain(e.target.value)}
        />
      </div>
      <div style={{ marginLeft: 200 }}>
        <div>
          <label>Pitch: </label>
          <span>{pitch}</span>
        </div>
        <div>
          <label>Gain: </label>
          <span>{gain}</span>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
