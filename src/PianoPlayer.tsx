import * as React from 'react';
import Piano, { keys } from './Piano';
import playStateReducer, { PlayActionType } from './playStateReducer';
import { major, layoutScale } from './scale';
import {
  ArpType,
  ascendingArp,
  descendingArp,
  hillArp,
  randomArp
} from 'arpeggiator';

const ArpSelector: React.FunctionComponent<{
  arpType: ArpType;
  onChange: (arpType: ArpType) => void;
}> = props => (
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

const initialPlayState = new Array(keys.length).fill(false);
const scale = layoutScale(27, major, 24);
let arp: number[];
generateNewArpeggio();

const PianoPlayer: React.FunctionComponent = () => {
  const [playing, setPlaying] = React.useState(false);
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );
  const [sequenceIndex, setSequenceIndex] = React.useState(0);
  const nextKey = React.useRef<number>(arp[sequenceIndex]);
  const timer = React.useRef<NodeJS.Timer | null>(null);
  const [arpType, setArpType] = React.useState(ArpType.RANDOM);

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
          }, 150);

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
      <button onClick={() => generateNewArpeggio(arpType)}>
        Generate Arpeggio
      </button>
      <ArpSelector arpType={arpType} onChange={setArpType} />
      <button onClick={() => setPlaying(!playing)}>Start/Stop</button>
      <span> {playingKey ? playingKey.name : ' '}</span>
      <Piano playNotes={playState} />
    </div>
  );
};

function generateNewArpeggio(arpType: ArpType = ArpType.RANDOM) {
  switch (arpType) {
    case ArpType.RANDOM:
      arp = randomArp(scale, 8);
      break;
    case ArpType.ASCENDING:
      arp = ascendingArp(scale, 8);
      break;
    case ArpType.DESCENDING:
      arp = descendingArp(scale, 8);
      break;
    case ArpType.HILL:
      arp = hillArp(scale, 8);
      break;
    default:
    // no changes
  }
}

export default PianoPlayer;
