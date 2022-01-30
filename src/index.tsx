import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostContextProvider } from "./context/PostContext";
import { Provider } from "react-redux";
import store from "./redux-store/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PostContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
