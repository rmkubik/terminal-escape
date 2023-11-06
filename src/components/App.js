import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Sequence from "./Sequence";
import Line from "./Line";
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Prompt from "./Prompt";
import bindCommands from "../commands";

const App = () => {
  const [stdOut, setStdOut] = useState([]);
  const commands = bindCommands({
    stdout: (Component) =>
      setStdOut((prevStdout) => [...prevStdout, <Component />]),
  });
  const parseInput = (input) => {
    const [command, ...args] = input.split(" ");

    commands[command]?.(...args);
  };

  useEffect(() => {
    setStdOut([
      <Sequence>
        <Line delay={500}>Hello World</Line>
        <Line delay={500}>Hello World</Line>
        <Line delay={500}>Hello World</Line>
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
