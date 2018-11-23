import * as React from "react";

export default function useKeyPress(key: string) {
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(
    () => {
      const keyDown = document.body.addEventListener("keydown", e => {
        if (e.key === key) {
          setPressed(true);
        }
      });

      const keyUp = document.body.addEventListener("keyup", e => {
        if (e.key === key) {
          setPressed(false);
        }
      });

      return () => {
        document.body.removeEventListener(keyDown);
        document.body.removeEventListener(keyUp);
      };
    },
    [key]
  );

  return pressed;
}
