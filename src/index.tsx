import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
import PianoKeyboard from './PianoKeyboard';
import PianoPlayer from './PianoPlayer';
import VolumeControl from './VolumeControl';

const App = () => {
  const [gain, setGain] = React.useState<number>(0.15);

  return (
    <div>
      <div style={{marginBottom: 50}}>
        <PianoKeyboard />
      </div>
      <div style={{marginBottom: 50}}>
        <PianoPlayer gain={gain} />
      </div>
      <div style={{ marginTop: 80 }}>
        <VolumeControl volume={gain} setVolume={setGain} />
      </div>
      <div style={{ marginLeft: 200 }}>
        <div>
          <label>Gain: </label>
          <span>{gain}</span>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
