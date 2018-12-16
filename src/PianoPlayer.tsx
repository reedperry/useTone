import * as React from 'react';
import Piano, { keys } from './Piano';
import playStateReducer, { PlayActionType } from './playStateReducer';
import { major, layoutScale } from './Scale';
import { randomArp } from 'arpeggiator';

const initialPlayState = new Array(keys.length).fill(false);

const scale = layoutScale(3, major);
const arp = randomArp(scale, 8);

const PianoPlayer: React.FunctionComponent = () => {
  const [playing, setPlaying] = React.useState(false);
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );
  const [sequenceIndex, setSequenceIndex] = React.useState(0);
  const [rootNoteKey, setRootNoteKey] = React.useState(3);
  const [previousRootNoteKey, setPreviousRootNoteKey] = React.useState(0);
  const timer = React.useRef<NodeJS.Timer | null>(null);

  React.useEffect(
    () => {
      dispatch({
        type: PlayActionType.SET_ONE,
        keyIndex: previousRootNoteKey,
        isPlaying: false
      });
      dispatch({
        type: PlayActionType.SET_ONE,
        keyIndex: rootNoteKey,
        isPlaying: playing
      });
      return () => {
        dispatch({
          type: PlayActionType.SET_ONE,
          keyIndex: rootNoteKey,
          isPlaying: false
        });
      };
    },
    [rootNoteKey, previousRootNoteKey, playing]
  );

  React.useEffect(
    () => {
      const playingKeys: number[] = [];
      playState.forEach((keyIsPlaying, i) => {
        if (keyIsPlaying) {
          playingKeys.push(i);
        }
      });

      if (
        playState.some(isPlaying => !!isPlaying && playingKeys.length > 1) &&
        !timer.current
      ) {
        timer.current = setTimeout(() => {
          dispatch({
            type: PlayActionType.SET_ONE,
            keyIndex: playingKeys[1],
            isPlaying: false
          });

          if (sequenceIndex === arp.length - 1) {
            setSequenceIndex(0);
          } else {
            setSequenceIndex(sequenceIndex + 1);
          }

          timer.current = null;
          setTimeout(() => {
            const nextKey = arp[sequenceIndex];
            dispatch({
              type: PlayActionType.SET_ONE,
              keyIndex: nextKey,
              isPlaying: true
            });
          }, 10);
        }, 200);
      }
    },
    [playState, sequenceIndex]
  );

  // React.useEffect(
  //   () => {
  //     const playingKeys: number[] = [];
  //     playState.forEach((playing, i) => {
  //       if (playing) {
  //         playingKeys.push(i);
  //       }
  //     });

  //     if (playState.some(playing => !!playing) && !timer.current) {
  //       timer.current = setTimeout(() => {
  //         dispatch({ type: PlayActionType.SET_ALL, isPlaying: false });
  //         timer.current = null;
  //         setTimeout(() => {
  //           dispatch({
  //             type: PlayActionType.SET_MULTIPLE,
  //             keys: selectChord(),
  //             isPlaying: true
  //           });
  //         }, 500);
  //       }, 1000);
  //     }
  //   },
  //   [playState]
  // );

  return (
    <div className="piano-player">
      <button onClick={() => setPlaying(!playing)}>Start/Stop</button>
      <div>
        <p>Change Bass Note</p>
        <button
          style={{
            padding: 10,
            margin: 10,
            border: rootNoteKey === 0 ? '2px inset orange' : undefined
          }}
          onClick={() => {
            setPreviousRootNoteKey(rootNoteKey);
            setRootNoteKey(0);
          }}>
          A
        </button>
        <button
          style={{
            padding: 10,
            margin: 10,
            border: rootNoteKey === 3 ? '2px inset orange' : undefined
          }}
          onClick={() => {
            setPreviousRootNoteKey(rootNoteKey);
            setRootNoteKey(3);
          }}>
          C
        </button>
      </div>
      {keys.map((key, i) => (
        <span key={key.name} style={{ marginRight: 3, marginLeft: 3 }}>
          <label>{key.name}</label>
          <input
            type="checkbox"
            checked={playState[i]}
            onChange={() =>
              dispatch({
                type: PlayActionType.SET_ONE,
                keyIndex: i,
                isPlaying: true
              })
            }
          />
        </span>
      ))}
      <Piano playNotes={playState} />
    </div>
  );
};

const cMajor: number[] = [];
keys.forEach((key, i) => {
  if (!key.black) {
    cMajor.push(i);
  }
});

function selectChord(): number[] {
  return [
    cMajor[Math.floor(Math.random() * cMajor.length - 1)],
    cMajor[Math.floor(Math.random() * cMajor.length - 1)],
    cMajor[Math.floor(Math.random() * cMajor.length - 1)]
  ];
}

export default PianoPlayer;
