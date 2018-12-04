import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
import Tone from './Tone';
import { ToneType } from './useTone';
import Piano from './Piano';
import useKeyPress from './useKeyPress';
import playStateReducer from './playStateReducer';

interface PlayButtonProps {
  keyName: string;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}

const PlayButton: React.FunctionComponent<PlayButtonProps> = props => {
  return (
    <button
      className={`play-button${props.playing ? ' on' : ''}`}
      onClick={() => props.setPlaying(!props.playing)}
    >
      <span>Play/Pause</span>
      {props.keyName && ` (${props.keyName})`}
    </button>
  );
};

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeControl: React.FunctionComponent<VolumeControlProps> = props => {
  return (
    <input
      type="range"
      style={{ transform: 'rotateZ(-90deg)' }}
      min="0"
      max="0.5"
      step="0.01"
      value={props.volume}
      onChange={e => props.setVolume(Number.parseInt(e.target.value, 10))}
    />
  );
};

const initialPlayingState = [false, false, false, false, false, false];

const App = () => {
  const [pitch, setPitch] = React.useState(200);
  const [gain, setGain] = React.useState(0.25);
  const [playingState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayingState
  );

  const pressingA = useKeyPress('a');
  const pressingS = useKeyPress('s');
  const pressingD = useKeyPress('d');
  const pressingF = useKeyPress('f');
  const pressingG = useKeyPress('g');
  const pressingH = useKeyPress('h');

  const tones = [
    {
      playing: playingState[0] || pressingA,
      type: 'square',
      pitch: pitch * 0.5,
      gain,
      id: 0
    },
    {
      playing: playingState[1] || pressingS,
      type: 'square',
      pitch: pitch * 0.667,
      gain,
      id: 1
    },
    {
      playing: playingState[2] || pressingD,
      type: 'square',
      pitch,
      gain,
      id: 2
    },
    {
      playing: playingState[3] || pressingF,
      type: 'square',
      pitch: pitch * 1.333,
      gain,
      id: 3
    },
    {
      playing: playingState[4] || pressingG,
      type: 'square',
      pitch: pitch * 1.667,
      gain,
      id: 4
    },
    {
      playing: playingState[5] || pressingH,
      type: 'square',
      pitch: pitch * 2,
      gain,
      id: 5
    }
  ];

  return (
    <div>
      <Piano />
      <input
        type="range"
        min="1"
        max="1000"
        value={pitch}
        onChange={e => setPitch(Number.parseInt(e.target.value, 10))}
      />
      {tones.map(tone => (
        <Tone
          key={tone.id}
          play={tone.playing}
          type={tone.type as ToneType}
          pitch={tone.pitch}
          gain={tone.gain}
        />
      ))}
      <PlayButton
        playing={playingState[0]}
        setPlaying={isPlaying => dispatch({ keyIndex: 0, isPlaying })}
        keyName="A"
      />
      <PlayButton
        playing={playingState[1]}
        setPlaying={isPlaying => dispatch({ keyIndex: 1, isPlaying })}
        keyName="S"
      />
      <PlayButton
        playing={playingState[2]}
        setPlaying={isPlaying => dispatch({ keyIndex: 2, isPlaying })}
        keyName="D"
      />
      <PlayButton
        playing={playingState[3]}
        setPlaying={isPlaying => dispatch({ keyIndex: 3, isPlaying })}
        keyName="F"
      />
      <PlayButton
        playing={playingState[4]}
        setPlaying={isPlaying => dispatch({ keyIndex: 4, isPlaying })}
        keyName="G"
      />
      <PlayButton
        playing={playingState[5]}
        setPlaying={isPlaying => dispatch({ keyIndex: 5, isPlaying })}
        keyName="H"
      />
      <div style={{ marginTop: 80 }}>
        <VolumeControl volume={gain} setVolume={setGain} />
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
