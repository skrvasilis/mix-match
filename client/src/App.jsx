import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Container from "./Container";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import MyMatchesAll from "./components/MyMatchesAll";
import MyMatchSingle from "./components/MyMatchSingle";
import React, { useContext } from "react";
import Nav from "./components/Nav";
import MyContext from "./MyContext";

function App() {
  return (
    <Container>
       <Nav/> 
      <BrowserRouter>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/mymatchesall" component={MyMatchesAll} />
          <Route exact path="/mymatch/:id" component={MyMatchSingle} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
