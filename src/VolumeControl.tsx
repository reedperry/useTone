import * as React from 'react';

interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

/**
 * A VolumeControl renders a simple range input that displays its current value
 * and reports changes
 */
const VolumeControl: React.FunctionComponent<VolumeControlProps> = props => {
  return (
    <input
      type="range"
      className="volume-control"
      min="0"
      max="0.5"
      step="0.01"
      value={props.volume}
      onChange={e => props.setVolume(Number.parseFloat(e.target.value))}
    />
  );
};

export default VolumeControl;
