import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocalStorageContextProvider } from "./share/LocalStorageContext";

ReactDOM.render(
  <LocalStorageContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </LocalStorageContextProvider>,
  document.getElementById("root")
);
