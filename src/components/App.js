import React from "react";
import { ThemeProvider } from "styled-components";
import Sequence from "./Sequence";
import Line from "./Line";
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Prompt from "./Prompt";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Sequence flattenChildren>
          <Line delay={500}>Hello World</Line>
          <Line delay={500}>Hello World</Line>
          <Line delay={500}>Hello World</Line>
          <Prompt />
        </Sequence>
      </ThemeProvider>
    </>
  );
};

export default App;
