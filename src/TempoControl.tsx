import * as React from 'react';

interface TempoControlProps {
  tempo: number;
  setTempo: (tempo: number) => void;
}

const TempoControl: React.FunctionComponent<TempoControlProps> = props => {
  return (
    <input
      type="range"
      min="1"
      max="250"
      step="1"
      value={props.tempo}
      onChange={e => props.setTempo(Number.parseInt(e.target.value))}
    />
  );
};
export default TempoControl;