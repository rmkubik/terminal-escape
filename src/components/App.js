import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Sequence from "./Sequence";
import Line from "./Line";
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Prompt from "./Prompt";
import bindCommands from "../commands";
import FilesModel from "../data/files";
import shieldTxt from "../data/asciiArt/shield.txt";

const App = () => {
  const [stdOut, setStdOut] = useState([]);

  const parseInput = (input) => {
    const [command, ...args] = input.split(" ");

    const commands = bindCommands({
      stdout: (Component) => {
        setStdOut((prevStdout) => [...prevStdout, <Component />]);
      },
      prompt: () => {
        setStdOut((prevStdout) => [
          ...prevStdout,
          <Prompt onSubmit={parseInput} />,
        ]);
      },
      files: FilesModel,
    });

    if (!commands[command]) {
      setStdOut((prevStdout) => [
        ...prevStdout,
        <Line>Unrecognized command "{command}"</Line>,
        <Line>Try "help" for more info.</Line>,
        <Prompt onSubmit={parseInput} />,
      ]);
      return;
    }

    commands[command]?.(...args);
  };

  useEffect(() => {
    setStdOut([
      <Sequence>
        <Line />
        <Line asciiArt alt="Shield">
          {shieldTxt}
        </Line>
        <Line>Welcome to Shield OS</Line>
        <Line>Please authenticate to continue.</Line>
      </Sequence>,
      <Prompt onSubmit={parseInput} />,
    ]);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {stdOut}
      </ThemeProvider>
    </>
  );
};

export default App;
