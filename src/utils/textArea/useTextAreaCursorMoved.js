import { useEffect, useRef, useState } from "react";
import cursorMovingEventNames from "./cursorMovingEventNames";

const useTextAreaCursorMoved = ({ onMoved = () => {} } = {}) => {
  const [cursorPos, setCursorPos] = useState(0);
  const textAreaRef = useRef();

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    const handleCursorPosChanged = () => {
      const newPos = textAreaRef.current.selectionStart;

      // Has the cursor moved?
      if (newPos !== cursorPos) {
        onMoved(newPos, cursorPos);
      }

      setCursorPos(newPos);
    };

    cursorMovingEventNames.forEach((eventName) => {
      document.addEventListener(eventName, handleCursorPosChanged);
    });

    return () => {
      cursorMovingEventNames.forEach((eventName) => {
        document.removeEventListener(eventName, handleCursorPosChanged);
      });
    };
  }, [textAreaRef.current]);

  return { textAreaRef, cursorPos };
};

export default useTextAreaCursorMoved;
