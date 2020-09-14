import React from "react";
import "./App.css";
import Container from "./Container";
import Home from "./components/Home";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Container>
      <Home />
      <Welcome />
    </Container>
  );
}

export default App;
