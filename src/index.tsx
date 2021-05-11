import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
import PianoKeyboard from './PianoKeyboard';
import PianoPlayer from './PianoPlayer';
import VolumeControl from './VolumeControl';
import TempoControl from './TempoControl';
import { Schedulerx, Measure } from './schedulerx';
import WaveShapeControl from './WaveShapeControl';

const App = () => {
  const [userInteracted, setUserInteracted] = React.useState<boolean>(false);
  const [gain, setGain] = React.useState<number>(0.15);
  const [tempo, setTempo] = React.useState<number>(70);
  const [waveShape, setWaveShape] = React.useState<OscillatorType>('sine');

  return (
    <div className="app">
      {!userInteracted && <div className="start-audio-control"><button onClick={() => setUserInteracted(true)}>Allow Audio!</button></div>}
      {userInteracted && (
        <React.Fragment>
      <div style={{marginBottom: 50}}>
        <PianoKeyboard />
      </div>
      <div style={{marginBottom: 50}}>
        <PianoPlayer gain={gain} tempo={tempo} waveShape={waveShape} />
      </div>
      <div style={{ marginTop: 80 }}>
        <WaveShapeControl waveShape={waveShape} setWaveShape={setWaveShape} />
      </div>
      <div style={{ marginLeft: 200 }}>
        <div>
          <label>Wave shape: </label>
          <span>{waveShape}</span>
        </div>
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
      <div style={{ marginTop: 80 }}>
        <TempoControl tempo={tempo} setTempo={setTempo} />
      </div>
      <div style={{ marginLeft: 200 }}>
        <div>
          <label>Tempo: </label>
          <span>{tempo}</span>
        </div>
      </div>
      </React.Fragment>
      )}
    </div>
  );
};

render(<App />, document.getElementById('root'));

const s = new Schedulerx();
const m: Measure = {
  beats: 4,
  steps: 16,
  notes: [
    {keyIndex: 0, duration: 2, step: 0},
    {keyIndex: 1, duration: 1, step: 1},
    {keyIndex: 2, duration: 4, step: 3},
    {keyIndex: 3, duration: 5, step: 0},
    {keyIndex: 4, duration: 2, step: 3},
    {keyIndex: 5, duration: 3, step: 1},
    {keyIndex: 6, duration: 2, step: 6},
    {keyIndex: 7, duration: 1, step: 5}
  ]
};

const schedule = s.scheduleMeasure(m);