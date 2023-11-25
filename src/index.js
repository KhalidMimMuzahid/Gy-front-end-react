import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import "./styles/_index.scss";
import "./utils/function/sidebarToggle";
import { Breakpoints } from "react-device-breakpoints";
// console.log = console.warn = console.error = () => {}; // console clear

const breakpoints = {
  isTablet: "(max-width: 767px)",
};
ReactDOM.render(
  <Provider store={store}>
    <Breakpoints {...breakpoints}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Breakpoints>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
