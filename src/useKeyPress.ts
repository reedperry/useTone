import * as React from 'react';

export default function useKeyPress(key: string) {
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(
    () => {
      const onKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === key) {
          setPressed(true);
        }
      };

      const onKeyUp = (evt: KeyboardEvent) => {
        if (evt.key === key) {
          setPressed(false);
        }
      };

      document.body.addEventListener<'keydown'>('keydown', onKeyDown);
      document.body.addEventListener<'keyup'>('keyup', onKeyUp);

      return () => {
        document.body.removeEventListener('keyup', onKeyDown);
        document.body.removeEventListener('keydown', onKeyUp);
      };
    },
    [key]
  );

  return pressed;
}
