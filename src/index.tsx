import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

const Application = () => (
  <Router>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
