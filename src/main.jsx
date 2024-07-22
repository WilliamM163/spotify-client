import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store, accessTokenThunk} from "./store.jsx";
import { Provider } from "react-redux";

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