import * as React from 'react';
import Tone from './Tone';

const toneType: OscillatorType = 'sawtooth';

export const keys = [
  { name: 'A', freq: 27.500000000000000 },
  { name: 'B♭', freq: 29.135235094880619, black: true },
  { name: 'B', freq: 30.867706328507756 },
  { name: 'C', freq: 32.703195662574829 },
  { name: 'D♭', freq: 34.647828872109012, black: true },
  { name: 'D', freq: 36.708095989675945 },
  { name: 'E♭', freq: 38.890872965260113, black: true },
  { name: 'E', freq: 41.203444614108741 },
  { name: 'F', freq: 43.653528929125485 },
  { name: 'G♭', freq: 46.249302838954299, black: true },
  { name: 'G', freq: 48.999429497718661 },
  { name: 'A♭', freq: 51.913087197493142, black: true },
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
  { name: 'E♭5', freq: 622.254, black: true },
  { name: 'E5', freq: 659.255113825739859 },
  { name: 'F5', freq: 698.456462866007768 },
  { name: 'G♭5', freq: 739.988845423268797, black: true },
  { name: 'G5', freq: 783.990871963498588 },
  { name: 'A♭5', freq: 830.609395159890277, black: true },
  { name: 'A6', freq: 880.000000000000000 },
  { name: 'B♭6', freq: 932.327523036179832, black: true },
  { name: 'B6', freq: 987.766602512248223 },
  { name: 'C6', freq: 1046.502261202394538 },
  { name: 'D♭6', freq: 1108.730523907488384, black: true },
  { name: 'D6', freq: 1174.659071669630241 },
  { name: 'E♭6', freq: 1244.507934888323642, black: true },
  { name: 'E6', freq: 1318.510227651479718 },
  { name: 'F6', freq: 1396.912925732015537 },
  { name: 'G♭6', freq: 1479.977690846537595, black: true },
  { name: 'G6', freq: 1567.981743926997176 },
  { name: 'A♭6', freq: 1661.218790319780554, black: true },
  { name: 'A7', freq: 1760.000000000000000 },
  { name: 'B♭7', freq: 1864.655046072359665, black: true },
  { name: 'B7', freq: 1975.533205024496447 },
  { name: 'C7', freq: 2093.004522404789077 },
  { name: 'D♭7', freq: 2217.461047814976769, black: true },
  { name: 'D7', freq: 2349.318143339260482 },
  { name: 'E♭7', freq: 2489.015869776647285, black: true },
  { name: 'E7', freq: 2637.020455302959437 },
  { name: 'F7', freq: 2793.825851464031075 },
  { name: 'G♭7', freq: 2959.955381693075191, black: true },
  { name: 'G7', freq: 3135.963487853994352 },
  { name: 'A♭7', freq: 3322.437580639561108, black: true },
  { name: 'A8', freq: 3520.000000000000000 },
  { name: 'B♭8', freq: 3729.310092144719331, black: true },
  { name: 'B8', freq: 3951.066410048992894 },
  { name: 'C8', freq: 4186.009044809578154 }
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
    <div>
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
