import React from "react";
import ReactDOM from "react-dom/client";

import App from "./Options";

import "./index.css";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
