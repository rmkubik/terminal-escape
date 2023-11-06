import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Menlo,Courier,monospace;
    color: ${(props) => props.theme.colors.stdOutText};
    background-color: ${(props) => props.theme.colors.bg};
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
