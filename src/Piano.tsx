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
  { name: 'B♭3', freq: 233.0819, black: true },
  { name: 'B3', freq: 246.9417 },
  { name: 'C4', freq: 261.6256 },
  { name: 'D♭4', freq: 277.1826, black: true },
  { name: 'D4', freq: 293.6648 },
  { name: 'E♭4', freq: 311.127, black: true },
  { name: 'E4', freq: 329.6276 },
  { name: 'F4', freq: 349.2282 },
  { name: 'G♭4', freq: 369.9944, black: true },
  { name: 'G4', freq: 391.9954 },
  { name: 'A♭4', freq: 415.3047, black: true },
  { name: 'A4', freq: 440 },
  { name: 'B♭4', freq: 466.1638, black: true },
  { name: 'B4', freq: 493.8833 },
  { name: 'C5', freq: 523.2511 },
  { name: 'D♭5', freq: 554.3653, black: true },
  { name: 'D5', freq: 587.3295 },
  { name: 'E♭5', freq: 622.254, black: true }
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
