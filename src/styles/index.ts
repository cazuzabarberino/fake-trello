import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  body{
    color: #172b4d;
  }

  button {
    cursor: pointer;
  }

`;

interface PanelConfig {
  listWidth: number;
  listMargin: number;
}

export const panelConfig: PanelConfig = {
  listWidth: 272,
  listMargin: 8,
};

export const theme = {};
