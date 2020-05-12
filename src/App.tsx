import React from "react";
import Panel from "./pages/panel";
import { GlobalStyles, theme } from "./styles";
import { ThemeProvider } from "styled-components";
import Header from "./components/header";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Panel />
      </ThemeProvider>
    </>
  );
}

export default App;
