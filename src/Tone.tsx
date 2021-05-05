import useTone from './useTone';

export interface ToneProps {
  play: boolean;
  pitch?: number;
  type?: OscillatorType;
  gain?: number;
}

const Tone: React.FunctionComponent<ToneProps> = props => {
  useTone(props.play, props.type, props.pitch, props.gain);
  return null;
};

export default Tone;
