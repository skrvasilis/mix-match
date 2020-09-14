import React from "react";
import "./App.css";
import Container from "./Container";
import Home from "./components/Home";
import Result from "./components/Result";

function App() {
  return (
    <Container>
      <Home />
      <Result/>
    </Container>
  );
}

export default App;
