import { useEffect, useState } from "react";

export const useInputEvent = () => {
  const [key, setKey] = useState('');
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => setKey(event.code);
    const keyUpHandler = () => setKey('');
    global.addEventListener('keydown', keyDownHandler);
    global.addEventListener('keyup', keyUpHandler);
    return () => {
      global.removeEventListener("keydown", keyDownHandler);
      global.removeEventListener("keyup", keyUpHandler)
    }
  }, []);
  return key;
}