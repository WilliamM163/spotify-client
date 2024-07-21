import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import authenticate from './login_api.js'
import { store } from './store.jsx';

// grabbing state and dispatch from store
const state = store.getState()
const dispatch = store.dispatch;

// This is were we are using the Spotify API to authenticate the use
// This is the unofficial way of grabbing the access token. I want to do this straight in redux using the dispatch method.
const access_token = await authenticate();
console.log(access_token);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App state={state} dispatch={dispatch} />
  </React.StrictMode>,
)
