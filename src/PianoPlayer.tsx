import * as React from 'react';
import Piano, { keys } from './Piano';
import playStateReducer, { PlayActionType } from './playStateReducer';
import { major, layoutScale } from './scale';
import {
  ArpType,
  ascendingArp,
  descendingArp,
  hillArp,
  randomArp,
  Arpeggio
} from './arpeggiator';
import ArpeggioViewer from './ArpeggioViewer';

const initialPlayState = new Array(keys.length).fill(false);
const scale = layoutScale(27, major, 24);

const PianoPlayer: React.FunctionComponent<{ gain: number, tempo: number, waveShape: OscillatorType }> = props => {
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );
  const [arp, setArp] = React.useState<Arpeggio>(generateNewArpeggio());
  const [sequenceIndex, setSequenceIndex] = React.useState(0);
  const nextKey = React.useRef<number>(arp[sequenceIndex]);
  const timer = React.useRef<number | null>(null);
  const [arpType, setArpType] = React.useState(ArpType.RANDOM);

  // Eighth notes
  const noteDuration = (1000 * 60) / props.tempo / 4;


  React.useEffect(
    () => {
      if (playing) {
        // Start the arpeggio over when pressing play
        setSequenceIndex(0);
      } else {
        // Stop everything
        dispatch({
          type: PlayActionType.SET_ALL,
          isPlaying: false
        });
      }
    },
    [playing]
  );

  React.useEffect(() => {
    nextKey.current = arp[sequenceIndex];
  });

  React.useEffect(
    () => {
      if (playing) {
        const key = nextKey.current;

        if (!timer.current && !playState[key]) {
          timer.current = setTimeout(() => {
            dispatch({
              type: PlayActionType.SET_ONE,
              keyIndex: key,
              isPlaying: false
            });

            timer.current = null;
          }, noteDuration);

          dispatch({
            type: PlayActionType.SET_ONE,
            keyIndex: key,
            isPlaying: true
          });

          if (sequenceIndex === arp.length - 1) {
            setSequenceIndex(0);
          } else {
            setSequenceIndex(sequenceIndex + 1);
          }
        }
      }
    },
    [playState, sequenceIndex, playing]
  );

  let playingKey = null;
  const playingKeyIndex = playState.findIndex(isKeyPlaying => !!isKeyPlaying);
  if (playingKeyIndex > -1) {
    playingKey = keys[playingKeyIndex];
  }

  return (
    <div className="piano-player">
      <button onClick={() => setArp(generateNewArpeggio(arpType))} className="buffer-small">
        Generate Arpeggio
      </button>
      <ArpSelector arpType={arpType} onChange={setArpType} />
      <ArpeggioViewer arp={arp} />
      <button onClick={() => setPlaying(!playing)} className="buffer-small">Start/Stop</button>
      <span> {playingKey ? playingKey.name : ' '}</span>
      <Piano playNotes={playState} gain={props.gain} waveShape={props.waveShape} />
    </div>
  );
};

function ArpSelector(props: {
  arpType: ArpType;
  onChange: (arpType: ArpType) => void;
}) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value={ArpType.RANDOM}
          checked={props.arpType === ArpType.RANDOM}
          onChange={e => props.onChange(Number.parseInt(e.target.value, 10))}
        />
        Random
      </label>
      <label>
        <input
          type="radio"
          value={ArpType.ASCENDING}
          checked={props.arpType === ArpType.ASCENDING}
          onChange={e => props.onChange(Number.parseInt(e.target.value, 10))}
        />
        Ascending
      </label>
      <label>
        <input
          type="radio"
          value={ArpType.DESCENDING}
          checked={props.arpType === ArpType.DESCENDING}
          onChange={e => props.onChange(Number.parseInt(e.target.value, 10))}
        />
        Descending
      </label>
      <label>
        <input
          type="radio"
          value={ArpType.HILL}
          checked={props.arpType === ArpType.HILL}
          onChange={e => props.onChange(Number.parseInt(e.target.value, 10))}
        />
        Hill
      </label>
    </div>
  );
}

function generateNewArpeggio(arpType: ArpType = ArpType.RANDOM): Arpeggio {
  switch (arpType) {
    case ArpType.RANDOM:
      return randomArp(scale, 8);
      break;
    case ArpType.ASCENDING:
      return  ascendingArp(scale, 8);
      break;
    case ArpType.DESCENDING:
      return  descendingArp(scale, 8);
      break;
    case ArpType.HILL:
      return  hillArp(scale, 8);
      break;
    default:
    throw new Error('Unsupported ArpType: ' + arpType);
  }
}

export default PianoPlayer;
