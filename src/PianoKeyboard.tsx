import * as React from 'react';
import * as classNames from 'classnames';
import Piano, { keys } from './Piano';
import playStateReducer from './playStateReducer';

const initialPlayState = new Array(keys.length).fill(false);

const PianoKeyboard: React.FunctionComponent = () => {
  const [playState, dispatch] = React.useReducer(
    playStateReducer,
    initialPlayState
  );

  return (
    <div className="piano-keyboard">
      {keys.map((key, i) => (
        <div
          className={classNames('piano-key', {
            on: playState[i],
            black: key.black
          })}
          key={key.name}
          onMouseEnter={() => dispatch({ keyIndex: i, isPlaying: true })}
          onMouseLeave={() => dispatch({ keyIndex: i, isPlaying: false })}
        >
          <span>{key.name}</span>
        </div>
      ))}
      <Piano playNotes={playState} />
    </div>
  );
};

export default PianoKeyboard;
