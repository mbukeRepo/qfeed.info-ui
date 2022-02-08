import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import 'react-quill/dist/quill.snow.css';


const combineEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null  || compose;

const rootReducer = combineReducers({
  auth: authReducer
});
const store = createStore(rootReducer, combineEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    
    ,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

