import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Dropped from "./components/Dropped";
import Drop from "./components/Drop";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path = "/">
            <Redirect to="/Home" />
          </Route>
          <Route path = "/Home" component = { Home } />
          <Route path = "/Dropped" component = { Dropped } />
          <Route path = "/Drop" component = { Drop } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
