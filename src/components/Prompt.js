import React, { useEffect, useState } from "react";
import styled from "styled-components";
import setCursorToPos from "../utils/textArea/setCursorToPos";
import useTextAreaCursorMoved from "../utils/textArea/useTextAreaCursorMoved";
import useKeyPress from "../utils/inputEvents/useKeyPress";
import autosize from "autosize";

const Text = styled.textarea`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.promptText};

  width: 100%;
  font-size: 1rem;
  font-family: Menlo, Courier, monospace;
  font-weight: bold;
  height: 1rem;

  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`;

const Prompt = ({ onSubmit }) => {
  const [value, setValue] = useState("$ ");
  const [disabled, setDisabled] = useState(false);
  const { textAreaRef } = useTextAreaCursorMoved({
    onMoved: (newPos) => {
      if (newPos < 2) {
        setCursorToPos(textAreaRef.current, 2);
      }
    },
  });
  useKeyPress(
    {
      Enter: (e) => {
        // Only submit once and then
        // disable this prompt
        if (!disabled) {
          e.preventDefault();

          setDisabled(true);
          onSubmit(value.slice(2));
        }
      },
    },
    [disabled]
  );

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    setCursorToPos(textAreaRef.current, -1);
    autosize(textAreaRef.current);
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
