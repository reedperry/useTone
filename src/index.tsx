import * as React from 'react';
import { render } from 'react-dom';

function useTone(type = 'square', frequency = 440) {
  const [playing, setPlaying] = React.useState(false);
  const osc = React.useRef(null);
  const audioContext = React.useRef(null);

  React.useEffect(
    () => {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.current.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      oscillator.start(0);

      osc.current = oscillator;

      return () => {
        osc.current.stop();
        osc.current.disconnect();
      };
    },
    [type, frequency]
  );

  React.useEffect(
    () => {
      if (playing) {
        osc.current.connect(audioContext.current.destination);
      } else {
        osc.current.disconnect();
      }
    },
    [playing]
  );

  return [playing, setPlaying];
}

const App = () => {
  const [sinePlaying, sineSetPlaying] = useTone('sine', 440);
  /*
  const [squarePlaying, squareSetPlaying] = useTone('square', 330);
  const [square2Playing, square2SetPlaying] = useTone('square', 660);
  */
  return (
    <div>
      <button onClick={() => sineSetPlaying(!sinePlaying)}>Play/Pause</button>
    </div>
  );
};

render(<App />, document.getElementById('root'));
