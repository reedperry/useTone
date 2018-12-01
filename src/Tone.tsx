import * as React from "react";
import Tone, { ToneProps } from "./Tone";
import useTone, { ToneType } from "./useTone";

export interface ToneProps {
  play: boolean;
  pitch?: number;
  type?: ToneType;
  gain?: number;
}

function Tone(props): React.SFC<ToneProps> {
  useTone(props.play, props.type, props.pitch, props.gain);
  return null;
}

export default Tone;
