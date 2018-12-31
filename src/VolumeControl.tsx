import * as React from 'react';

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeControl: React.FunctionComponent<VolumeControlProps> = props => {
  return (
    <input
      type="range"
      style={{ transform: 'rotateZ(-90deg)' }}
      min="0"
      max="0.5"
      step="0.01"
      value={props.volume}
      onChange={e => props.setVolume(Number.parseFloat(e.target.value))}
    />
  );
};

export default VolumeControl;
