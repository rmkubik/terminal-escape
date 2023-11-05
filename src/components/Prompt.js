import React, { useEffect, useState } from "react";
import styled from "styled-components";
import setCursorToPos from "../utils/textArea/setCursorToPos";
import useTextAreaCursorMoved from "../utils/textArea/useTextAreaCursorMoved";
import useKeyPress from "../utils/inputEvents/useKeyPress";

const Text = styled.textarea`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};

  width: 100%;
  font-size: 1rem;
  font-family: Menlo, Courier, monospace;

  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`;

const Prompt = () => {
  const [value, setValue] = useState("$ ");
  const [disabled, setDisabled] = useState(false);
  const { textAreaRef } = useTextAreaCursorMoved({
    onMoved: (newPos) => {
      if (newPos < 3) {
        setCursorToPos(textAreaRef.current, 2);
      }
    },
  });
  useKeyPress({
    Enter: (e) => {
      e.preventDefault();

      setDisabled(true);
      console.log("enter");
    },
  });

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    setCursorToPos(textAreaRef.current, -1);
  }, [textAreaRef.current]);

  return (
    <Text
      disabled={disabled}
      type="text"
      autoFocus
      ref={textAreaRef}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default Prompt;
