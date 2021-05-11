import * as React from 'react';

interface WaveShapeControlProps {
  waveShape: OscillatorType;
  setWaveShape: (waveShape: OscillatorType) => void;
}


const WaveShapeControl: React.FunctionComponent<WaveShapeControlProps> = props => {
  return (
    <div className="wave-shape-control">
      <label>
        <input type="radio" name="wave-shape" value="sine" onChange={() => props.setWaveShape('sine')}/>Sine
      </label>
      <label>
        <input type="radio" name="wave-shape" value="sawtooth" onChange={() => props.setWaveShape('sawtooth')}/>Sawtooth
      </label>
      <label>
        <input type="radio" name="wave-shape" value="square" onChange={() => props.setWaveShape('square')}/>Square
      </label>
      <label>
        <input type="radio" name="wave-shape" value="triangle" onChange={() => props.setWaveShape('triangle')}/>Triangle
      </label>
    </div>
  )
}

export default WaveShapeControl;