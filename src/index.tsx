import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostContextProvider } from "./context/PostContext";

ReactDOM.render(
  <React.StrictMode>
    <PostContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
