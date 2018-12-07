import * as React from 'react';
import Tone from './Tone';
import playStateReducer, { PlayActionType } from './playStateReducer';

const toneType: OscillatorType = 'square';

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
  { name: 'B♭2', freq: 116.5409 },
  { name: 'B2', freq: 123.4708 },
  { name: 'C3', freq: 130.8128 },
  { name: 'D♭3', freq: 138.5913 },
  { name: 'D3', freq: 146.8324 },
  { name: 'E♭3', freq: 155.5635 },
  { name: 'E3', freq: 164.8138 },
  { name: 'F3', freq: 174.6141 },
  { name: 'G♭3', freq: 184.9972 },
  { name: 'G3', freq: 195.9977 },
  { name: 'A♭3', freq: 207.6523 },
  { name: 'A3', freq: 220 },
  { name: 'B♭3', freq: 233.0819 }
];

const initialPlayState = new Array(keys.length).fill(false);

interface PianoNote {
  keyName: string;
  playing: boolean;
  type: OscillatorType;
  pitch: number;
  id: number;
}

const Piano: React.FunctionComponent = () => {
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );

  // Do we avoid recreating this array each time if we take in playState boolean[] as a prop?
  // Keys themselves never change, unless we're only keeping a subset at a given time, or changing the toneType?
  const notes: PianoNote[] = keys.map((key, i) => ({
    keyName: key.name,
    playing: playState[i],
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
          className={`piano-key${note.playing ? ' on' : ''}`}
          key={note.id}
          onMouseEnter={() => dispatch({ type: PlayActionType.SET_ONE, keyIndex: note.id, isPlaying: true })}
          onMouseLeave={() =>
            dispatch({ type: PlayActionType.SET_ONE, keyIndex: note.id, isPlaying: false })
          }
        >
          <span>{note.keyName}</span>
        </div>
      ))}
    </div>
  );
};

export default Piano;
