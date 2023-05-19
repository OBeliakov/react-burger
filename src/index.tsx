import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { configureStore } from "./services/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();
const rootNode = document.querySelector("#root");
if (!rootNode) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);