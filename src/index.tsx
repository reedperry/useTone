import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
import Tone, { ToneProps } from './Tone';
import Piano from './Piano';
import useKeyPress from './useKeyPress';
import playStateReducer from './playStateReducer';

interface PlayButtonProps {
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}

function PlayButton(props): React.SFC<PlayButtonProps> {
  return (
    <button
      className={`play-button${props.playing ? ' on' : ''}`}
      onClick={() => props.setPlaying(!props.playing)}>
      {props.children || 'Play/Pause'}
      {props.keyName && ` (${props.keyName})`}
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
    />
  );
}

const initialPlayingState = {
  all: false,
  v1: false,
  v2: false,
  v3: false,
  v4: false,
  v5: false,
  v6: false
};

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

  const tones: ToneProps[] = [
    {
      playing: playingState.v1 || pressingA,
      type: 'square',
      pitch: pitch * 0.5,
      gain,
      id: 1
    },
    {
      playing: playingState.v2 || pressingS,
      type: 'square',
      pitch: pitch * 0.667,
      gain,
      id: 2
    },
    {
      playing: playingState.v3 || pressingD,
      type: 'square',
      pitch,
      gain,
      id: 3
    },
    {
      playing: playingState.v4 || pressingF,
      type: 'square',
      pitch: pitch * 1.333,
      gain,
      id: 4
    },
    {
      playing: playingState.v5 || pressingG,
      type: 'square',
      pitch: pitch * 1.667,
      gain,
      id: 5
    },
    {
      playing: playingState.v6 || pressingH,
      type: 'square',
      pitch: pitch * 2,
      gain,
      id: 6
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
        onChange={e => setPitch(e.target.value)}
      />
      {tones.map(tone => (
        <Tone
          key={tone.id}
          play={playingState.all || tone.playing}
          type={tone.type}
          pitch={tone.pitch}
          gain={tone.gain}
        />
      ))}
      <PlayButton
        playing={playingState.v1}
        setPlaying={isPlaying => dispatch({ key: 'v1', isPlaying })}
        keyName="A"
      />
      <PlayButton
        playing={playingState.v2}
        setPlaying={isPlaying => dispatch({ key: 'v2', isPlaying })}
        keyName="S"
      />
      <PlayButton
        playing={playingState.v3}
        setPlaying={isPlaying => dispatch({ key: 'v3', isPlaying })}
        keyName="D"
      />
      <PlayButton
        playing={playingState.v4}
        setPlaying={isPlaying => dispatch({ key: 'v4', isPlaying })}
        keyName="F"
      />
      <PlayButton
        playing={playingState.v5}
        setPlaying={isPlaying => dispatch({ key: 'v5', isPlaying })}
        keyName="G"
      />
      <PlayButton
        playing={playingState.v6}
        setPlaying={isPlaying => dispatch({ key: 'v6', isPlaying })}
        keyName="H"
      />
      <PlayButton
        playing={playingState.all}
        setPlaying={isPlaying => dispatch({ key: 'all', isPlaying })}>
        Play/Pause All
      </PlayButton>
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
