import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";

// create Redux store
const store = createStore(() => reducers, {}, applyMiddleware());

ReactDOM.render(
  // connect Redux store to React using Provider component
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
