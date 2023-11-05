import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Menlo,Courier,monospace;
    color: white;
    background-color: black;
  }

  button {
    cursor: pointer;
  }

  input {
    background: none;
    border: none;
    color: white;

    width: 100%;
    font-size: 1rem;
    font-family: Menlo,Courier,monospace;

    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyle;
