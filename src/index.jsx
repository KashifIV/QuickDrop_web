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

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware)); 
ReactDOM.render(

    <BrowserRouter>
      <Provider store = {store}>
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
