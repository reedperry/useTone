import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
import useTone, { ToneType } from './useTone';
import useKeyPress from './useKeyPress';

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
      {props.children || 'Play/Pause'}{props.keyName && ` (${props.keyName})`}
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
  const [v1Playing, setV1Playing] = React.useState(false);
  const [v2Playing, setV2Playing] = React.useState(false);
  const [v3Playing, setV3Playing] = React.useState(false);
  const [v4Playing, setV4Playing] = React.useState(false);
  const [v5Playing, setV5Playing] = React.useState(false);
  const [v6Playing, setV6Playing] = React.useState(false);
  
  const pressingA = useKeyPress('a');
  const pressingS = useKeyPress('s');
  const pressingD = useKeyPress('d');
  const pressingF = useKeyPress('f');
  const pressingG = useKeyPress('g');
  const pressingH = useKeyPress('h');

  const tones: ToneProps = [
    { playing: v1Playing || pressingA, type: 'triangle', pitch: pitch * 0.5, gain, id: 1 },
    { playing: v2Playing || pressingS, type: 'triangle', pitch: pitch * 0.667, gain, id: 2 },
    { playing: v3Playing || pressingD, type: 'triangle', pitch, gain, id: 3 },
    { playing: v4Playing || pressingF, type: 'square', pitch: pitch * 1.333, gain, id: 4 },
    { playing: v5Playing || pressingG, type: 'square', pitch: pitch * 1.667, gain, id: 5 },
    { playing: v6Playing || pressingH, type: 'square', pitch: pitch * 2, gain, id: 6 },
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
          key={tone.id}
          play={allPlaying || tone.playing}
          type={tone.type}
          pitch={tone.pitch}
          gain={tone.gain}
        />
      ))}
      <PlayButton playing={v1Playing} setPlaying={setV1Playing} keyName="A" />
      <PlayButton playing={v2Playing} setPlaying={setV2Playing} keyName="S" />
      <PlayButton playing={v3Playing} setPlaying={setV3Playing} keyName="D" />
      <PlayButton playing={v4Playing} setPlaying={setV4Playing} keyName="F" />
      <PlayButton playing={v5Playing} setPlaying={setV5Playing} keyName="G" />
      <PlayButton playing={v6Playing} setPlaying={setV6Playing} keyName="H" />
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
