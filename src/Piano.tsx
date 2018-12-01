import * as React from 'react';
import { ToneType } from './useTone';
import Tone from './Tone';
import playStateReducer from './playStateReducer';

const toneType: ToneType = 'square';

const keyFrequencies = {
  a1: 55,
  b1b: 58.27047,
  b1: 61.73541,
  c2: 65.40639,
  d2b: 69.29566,
  d2: 73.41619
  e2b: 77.78175
  e2: 82.40689
};

const initialPlayState = {
  a1: false,
  b1b: false,
  b1: false,
  c2: false,
  d2b: false,
  d2: false
  e2b: false
  e2: false
};


const Piano: React.SFC = () => {
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );

const tones: ToneProps[] = [
  {
    playing: playState.a1
    type: toneType,
    pitch: keyFrequencies.a1
    id: 1
  },
  {
    playing: playState.b1b
    type: toneType,
    pitch: keyFrequencies.b1b
    id: 2
  },
  {
    playing: playState.b1
    type: toneType,
    pitch: keyFrequencies.b1
    id: 3
  },
  {
    playing: playState.c2
    type: toneType,
    pitch: keyFrequencies.c2
    id: 4
  }
];
  
  return (
    <div className="piano">
      {tones.map(tone => (
        <Tone
          key={tone.id}
          play={tone.playing}
          type={tone.type}
          pitch={tone.pitch}
        />
      ))}
      <div
        onMouseEnter={() => dispatch({key: 'a1', isPlaying: true })}
        onMouseLeave={() => dispatch({key: 'a1', isPlaying: false })}>
        A1
      </div>
      <div
        onMouseEnter={() => dispatch({key: 'b1b', isPlaying: true })}
        onMouseLeave={() => dispatch({key: 'b1b', isPlaying: false })}>
        B1♭ 
      </div>
    </div>);
};


export default Piano;