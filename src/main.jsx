// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store, accessTokenThunk } from "./store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { authenticate } from "./api/login_api.js";

const rootElement = document.getElementById("root");

// Ensure the root element exists
if (!rootElement) {
  throw new Error("Root element with ID 'root' not found.");
}

// Authenticate and get access token
authenticate().then((accessToken) => {
  if (accessToken) {
    // Dispatch the thunk action to set the access token in the store
    store.dispatch(accessTokenThunk());
  } else {
    console.error("Authentication failed. Access token not obtained.");
  }
});

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
