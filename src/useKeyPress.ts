import * as React from 'react';

export default function useKeyPress(key: string) {
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(
    () => {
      const onKeyDown: EventListener = (e: KeyboardEvent) => {
        if (e.key === key) {
          setPressed(true);
        }
      };

      const onKeyUp: EventListener = (e: KeyboardEvent) => {
        if (e.key === key) {
          setPressed(false);
        }
      };

      document.body.addEventListener('keydown', onKeyDown);
      document.body.addEventListener('keyup', onKeyUp);

      return () => {
        document.body.removeEventListener('keyup', onKeyDown);
        document.body.removeEventListener('keydown', onKeyUp);
      };
    },
    [key]
  );

  return pressed;
}
