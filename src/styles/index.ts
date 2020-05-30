import { createGlobalStyle, DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    transparency: string;
    transparencyLight: string;
    scrollBar: string;
    scrollThumb: string;
    listColor: string;
    taskColor: string;
    green: string;
    red: string;
    blue: string;
    sky: string;
    yellow: string;
    orange: string;
    purple: string;
    pink: string;
    lime: string;
    black: string;
  }
}

export const defaultTheme: DefaultTheme = {
  fontColor: "#172b4d",
  transparency: "rgba(0, 0, 0, 0.32)",
  transparencyLight: "rgba(0, 0, 0, 0.16)",
  scrollBar: "#d9dce2",
  scrollThumb: "#bdc3ce",
  listColor: "#ebecf0",
  taskColor: "white",
  green: "#5aac44",
  red: "#eb5a46",
  blue: "#298fca",
  sky: "#00c2e0",
  yellow: "#f2d600",
  orange: "#ff9f1a",
  purple: "#c377e0",
  pink: "#ff78cb",
  lime: "#51e898",
  black: "#344563",
};

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  body{
    color: ${({ theme }) => theme.fontColor};
  }

  button {
    cursor: pointer;
  }

`;
