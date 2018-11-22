import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
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
  
interface PlayButtonProps {
  playing: boolean;
  setPlaying: (playing: boolean): void;
}

function PlayButton(props): React.SFC<PlayButtonProps> {
  return (
    <button
      className={`play-button${props.playing ? ' on' : ''}`}
      onClick={() => props.setPlaying(!props.playing)}>
      {props.children || 'Play/Pause'}
    </button>
  );
}
  
interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}
  
function VolumeControl(props): React.SFC<VolumeControlProps> {
  return (
        <input
          type="range"
          style={{ transform: 'rotateZ(-90deg)' }}
          min="0"
          max="0.5"
          step="0.01"
          value={props.volume}
          onChange={e => props.setVolume(e.target.value)}
        />);
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
    { playing: voice1Playing, type: 'square', pitch, gain },
    { playing: voice2Playing, type: 'sawtooth', pitch: pitch * 1.667, gain },
    { playing: voice3Playing, type: 'triangle', pitch: pitch * 1.333, gain },
    { playing: voice4Playing, type: 'square', pitch: pitch * 0.667, gain }
  ];

  return (
    <div>
      <input
        type="range"
        min="1"
        max="1000"
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
      <PlayButton playing={voice1Playing} setPlaying={setVoice1Playing} />
      <PlayButton playing={voice2Playing} setPlaying={setVoice2Playing} />
      <PlayButton playing={voice3Playing} setPlaying={setVoice3Playing} />
      <PlayButton playing={voice4Playing} setPlaying={setVoice4Playing} />
      <PlayButton playing={allPlaying} setPlaying={setAllPlaying}>Play/Pause All</PlayButton>
      <div style={{ marginTop: 80 }}>
        <VolumeControl
          volume={gain}
          setVolume={setGain} />
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
