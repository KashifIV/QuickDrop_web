import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from './redux/reducers/rootReducer'; 
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

const token = localStorage.getItem('token'); 
const email = token ? localStorage.getItem('email'): ''; 
const password = token ? localStorage.getItem('password'): ""; 
const store = createStore(rootReducer,{auth: token ? token : ""}, applyMiddleware(thunkMiddleware)); 
ReactDOM.render(

    <BrowserRouter>
      <Provider store = {store}>
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
