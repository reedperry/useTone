import * as React from 'react';
import Piano, { keys } from './Piano';
import playStateReducer, { PlayActionType } from './playStateReducer';

const initialPlayState = new Array(keys.length).fill(false);

const PianoPlayer: React.FunctionComponent = () => {
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );
  const timer = React.useRef<NodeJS.Timer | null>(null);

  React.useEffect(
    () => {
      const playingKeys: number[] = [];
      playState.forEach((playing, i) => {
        if (playing) {
          playingKeys.push(i);
        }
      });

      if (playState.some(playing => !!playing) && !timer.current) {
        timer.current = setTimeout(() => {
          dispatch({ type: PlayActionType.SET_ALL, isPlaying: false });
          timer.current = null;
          setTimeout(() => {
            dispatch({
              type: PlayActionType.SET_MULTIPLE,
              keys: selectChord(),
              isPlaying: true
            });
          }, 500);
        }, 1000);
      }
    },
    [playState]
  );

  return (
    <div className="piano-player">
      <div>Click one of these to kick off a (really basic) auto player!</div>
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
