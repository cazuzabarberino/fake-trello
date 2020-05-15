import React from "react";
import Panel from "./pages/panel";
import { GlobalStyles, theme } from "./styles";
import { ThemeProvider } from "styled-components";
import Header from "./components/header";
import styled from "styled-components";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header />
          <Panel />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background: #0079bf;
`;
