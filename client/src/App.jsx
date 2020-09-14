import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
      <Router>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/mymatchesall" component={MyMatchesAll} />
          <Route path="/mymatch" component={MyMatchSingle} />
        </Switch>
        {/* <Home />
        <Welcome />
        <MyMatchesAll />
        <MyMatchSingle /> */}
        <Result />
      </Router>
    </Container>
  );
}

export default App;
