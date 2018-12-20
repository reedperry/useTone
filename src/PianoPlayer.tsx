import * as React from 'react';
import Piano, { keys } from './Piano';
import playStateReducer, { PlayActionType } from './playStateReducer';
import { major, layoutScale } from './Scale';
import { randomArp } from 'arpeggiator';

const initialPlayState = new Array(keys.length).fill(false);

const scale = layoutScale(27, major, 24);
const arp = randomArp(scale, 8);

const PianoPlayer: React.FunctionComponent = () => {
  const [playing, setPlaying] = React.useState(false);
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );
  const [sequenceIndex, setSequenceIndex] = React.useState(0);
  const nextKey = React.useRef<number>(arp[sequenceIndex]);
  const timer = React.useRef<NodeJS.Timer | null>(null);

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

  return (
    <div className="piano-player">
      <button onClick={() => setPlaying(!playing)}>Start/Stop</button>
      {keys.map((key, i) => (
        <span key={key.name} style={{ marginRight: 3, marginLeft: 3 }}>
          <label>{key.name}</label>
          <input type="checkbox" readOnly={true} checked={playState[i]} />
        </span>
      ))}
      <Piano playNotes={playState} />
    </div>
  );
};

export default PianoPlayer;
