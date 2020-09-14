import React from "react";
import "./App.css";
import Container from "./Container";
import Home from "./components/Home";
import Result from "./components/Result";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Container>
      <Home />
      <Welcome />
      <Result/>
    </Container>
  );
}

export default App;
