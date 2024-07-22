// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store.jsx";
import { Provider } from "react-redux";
import { accessTokenThunk } from "./store.jsx";

const rootElement = document.getElementById("root");

// Dispatch the thunk action to get the access token
store.dispatch(accessTokenThunk());

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// Ayush ->This is the summary of What I changed
// store.jsx: Added extraReducers to handle the different states of the asynchronous action (pending, fulfilled, rejected). Exported accessTokenThunk for use in main.jsx.
// main.jsx: Used the Provider component from react-redux to wrap the App component and dispatched the accessTokenThunk to initiate the authentication process.

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// import authenticate from './login_api.js'
// import { store } from './store.jsx';

// // grabbing state and dispatch from store
// const state = store.getState()
// const dispatch = store.dispatch;

// // This is were we are using the Spotify API to authenticate the use
// // This is the unofficial way of grabbing the access token. I want to do this straight in redux using the dispatch method.
// const access_token = await authenticate();
// console.log(access_token);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App state={state} dispatch={dispatch} />
//   </React.StrictMode>,
// )
