import * as React from 'react';
import { ToneType } from './useTone';
import Tone from './Tone';
import playStateReducer from './playStateReducer';

const toneType: ToneType = 'square';

// Maybe this could be a simple boolean[] since piano keys are a fixed known set
const initialPlayState = {
  A1: false,
  'B♭1': false,
  B1: false,
  C2: false,
  'D♭1': false,
  D2: false,
  'E♭1': false,
  E2: false
};

const keys = [
  { name: 'A1', freq: 55 },
  { name: 'B♭1', freq: 58.27047 },
  { name: 'B1', freq: 61.73541 },
  { name: 'C2', freq: 65.40639 },
  { name: 'D♭2', freq: 69.29566 },
  { name: 'D2', freq: 73.41619 },
  { name: 'E♭2', freq: 77.78175 },
  { name: 'E2', freq: 82.40689 },
  { name: 'F2', freq: 87.30706 },
  { name: 'G♭2', freq: 92.49861 },
  { name: 'G2', freq: 97.99886 },
  { name: 'A♭2', freq: 103.8262 },
  { name: 'A2', freq: 110.0 },
  { name: 'B♭2', freq: 116.5409 }
];

interface PianoNote {
  keyName: string;
  playing: boolean;
  type: ToneType;
  pitch: number;
  id: number;
}

const Piano: React.SFC = () => {
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );

  // Do we avoid recreating this array each time if we take in playState boolean[] as a prop?
  // Keys themselves never change, unless we're only keeping a subset at a given time, or changing the toneType?
  const notes: PianoNote[] = keys.map((key, i) => ({
    keyName: key.name,
    playing: playState[key.name],
    type: toneType,
    pitch: key.freq,
    id: i
  }));

  return (
    <div className="piano">
      {notes.map(note => (
        <Tone
          key={note.id}
          play={note.playing}
          type={note.type}
          pitch={note.pitch}
        />
      ))}
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            padding: 10,
            border: '1px solid gray',
            background: note.playing ? 'lightgray' : 'white'
          }}
          onMouseEnter={() => dispatch({ key: note.keyName, isPlaying: true })}
          onMouseLeave={() =>
            dispatch({ key: note.keyName, isPlaying: false })
          }>
          <span>{note.keyName}</span>
        </div>
      ))}
    </div>
  );
};

export default Piano;
