import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/Store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
