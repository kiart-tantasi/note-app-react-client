import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostContextProvider } from "./share/PostContext";

ReactDOM.render(
  <PostContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </PostContextProvider>,
  document.getElementById("root")
);
