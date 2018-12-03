import * as React from 'react';
import useTone, { ToneType } from './useTone';

export interface ToneProps {
  play: boolean;
  pitch?: number;
  type?: ToneType;
  gain?: number;
}

const Tone: React.FunctionComponent<ToneProps> = props => {
  useTone(props.play, props.type, props.pitch, props.gain);
  return null;
};

export default Tone;
