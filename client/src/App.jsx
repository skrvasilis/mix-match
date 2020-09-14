import React from "react";
import "./App.css";
import Container from "./Container";
import Home from "./components/Home";
import Result from "./components/Result";
import Welcome from "./components/Welcome";
import MyMatchesAll from "./components/MyMatchesAll";
import MyMatchSingle from "./components/MyMatchSingle";

function App() {
  return (
    <Container>
      <Home />
      <Welcome />
      <MyMatchesAll />
      <MyMatchSingle />
      <Result/>
    </Container>
  );
}

export default App;
