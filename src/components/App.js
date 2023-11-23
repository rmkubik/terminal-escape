import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Sequence from "./Sequence";
import Line from "./Line";
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Prompt from "./Prompt";
import bindCommands from "../commands";
import FilesModel from "../data/files";
import shieldTxt from "../data/asciiArt/shield.txt";
import env from "../data/env.yaml";
import DependencyModel from "../data/dependencies";

const Console = styled.div`
  overflow-y: scroll;
  height: 800px;
`;

const App = () => {
  const [stdOut, setStdOut] = useState([]);
  const consoleRef = useRef();

  const parseInput = (input) => {
    const [command, ...args] = input.split(" ");

    const commands = bindCommands({
      stdout: (Component) => {
        setStdOut((prevStdout) => [...prevStdout, <Component />]);
      },
      prompt: () => {
        setStdOut((prevStdout) => [
          ...prevStdout,
          <Prompt
            onSubmit={parseInput}
            onMount={() => {
              consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }}
          />,
        ]);
      },
      dependencies: DependencyModel,
      files: FilesModel,
    });

    if (!commands[command]) {
      setStdOut((prevStdout) => [
        ...prevStdout,
        <Line>Unrecognized command "{command}"</Line>,
        <Line>Try "help" for more info.</Line>,
        <Prompt
          onSubmit={parseInput}
          onMount={() => {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
          }}
        />,
      ]);
      return;
    }

    commands[command]?.(...args);
  };

  useEffect(() => {
    setStdOut([
      <Sequence>
        <Line />
        <Line asciiArt bold color="asciiArtColor" alt="Shield">
          {shieldTxt}
        </Line>
        <Line color="asciiArtColor">SHIELD_OS v3.37.2</Line>
        <Line />
        <Line color="asciiArtColor">{"---- [CUSTOM User Greeting] ----"}</Line>
        <Line>This SERVER is super 1337 and SECURE.</Line>
        <Line />
        <Line>I DARE you to try and break in!</Line>
        <Line />
        <Line>If you don't know how terminals work</Line>
        <Line>you'll NEVER make it. But if you</Line>
        <Line>wanna try anyway, I made a special</Line>
        <Line>command just for you.</Line>
        <Line />
        <Line>Try typing in: "help newb"</Line>
        <Line color="asciiArtColor">{"--------------------------------"}</Line>
        <Line />
        <Line>
          Welcome to <strong>Shield OS</strong>
        </Line>
        <Line>Please authenticate to continue.</Line>
      </Sequence>,
      <Prompt onSubmit={parseInput} />,
    ]);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Console ref={consoleRef}>{stdOut}</Console>
      </ThemeProvider>
    </>
  );
};

export default App;
