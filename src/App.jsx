import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Dropped from "./components/Dropped";
import Drop from "./components/Drop";
import { socketDispatcher } from "./redux/actions";
import {connect } from 'react-redux'; 

class App extends Component {
  constructor(props){
    super(props); 
  }
  componentDidMount(){
    const {onInitialize} = this.props;
    onInitialize(); 
  }
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
const mapDispatchToProps = dispatch => {
  return {
    onInitialize: () => dispatch(socketDispatcher())
  }
}
const mapStateToProps = state => {
  const {token} = state; 
  return {token}; 
}
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App); 
export default AppContainer;
