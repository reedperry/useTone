import * as React from 'react';
import Tone from './Tone';

const toneType: OscillatorType = 'square';

export const keys = [
  { name: 'A1', freq: 55 },
  { name: 'B♭1', freq: 58.27047, black: true },
  { name: 'B1', freq: 61.73541 },
  { name: 'C2', freq: 65.40639 },
  { name: 'D♭2', freq: 69.29566, black: true },
  { name: 'D2', freq: 73.41619 },
  { name: 'E♭2', freq: 77.78175, black: true },
  { name: 'E2', freq: 82.40689 },
  { name: 'F2', freq: 87.30706 },
  { name: 'G♭2', freq: 92.49861, black: true },
  { name: 'G2', freq: 97.99886 },
  { name: 'A♭2', freq: 103.8262, black: true },
  { name: 'A2', freq: 110.0 },
  { name: 'B♭2', freq: 116.5409, black: true },
  { name: 'B2', freq: 123.4708 },
  { name: 'C3', freq: 130.8128 },
  { name: 'D♭3', freq: 138.5913, black: true },
  { name: 'D3', freq: 146.8324 },
  { name: 'E♭3', freq: 155.5635, black: true },
  { name: 'E3', freq: 164.8138 },
  { name: 'F3', freq: 174.6141 },
  { name: 'G♭3', freq: 184.9972, black: true },
  { name: 'G3', freq: 195.9977 },
  { name: 'A♭3', freq: 207.6523, black: true },
  { name: 'A3', freq: 220 },
  { name: 'B♭3', freq: 233.0819, black: true }
];

const notes: PianoNote[] = keys.map((key, i) => ({
  keyName: key.name,
  type: toneType,
  pitch: key.freq,
  id: i
}));

interface PianoNote {
  keyName: string;
  type: OscillatorType;
  pitch: number;
  id: number;
}

interface PianoPlayerProps {
  playNotes: boolean[];
}

const PianoPlayer: React.FunctionComponent<PianoPlayerProps> = props => {
  return (
    <div className="piano-player">
      {notes.map((note, i) => (
        <Tone
          key={note.id}
          play={props.playNotes[i]}
          type={note.type}
          pitch={note.pitch}
        />
      ))}
    </div>
  );
};

export default PianoPlayer;
