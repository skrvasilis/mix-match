import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Container from "./Container";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import MyMatchesAll from "./components/MyMatchesAll";
import MyMatchSingle from "./components/MyMatchSingle";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          
          <Route exact path="/" exact component={Home} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/mymatchesall" component={MyMatchesAll} />
          <Route path="/mymatch" component={MyMatchSingle} />
        </Switch>
        {/* <Home />
        <MyMatchesAll />
        <MyMatchSingle /> */}
      </BrowserRouter>
    </Container>
  );
}

export default App;
