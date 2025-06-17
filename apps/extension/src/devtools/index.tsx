import React from "react";
import ReactDOM from "react-dom/client";

import { DevTools } from "./DevTools";

import "./index.css";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <DevTools />
    </React.StrictMode>,
  );
}

chrome.devtools.panels.create(
  "ReactCrx",
  "",
  "../../devtools.html",
  function () {
    console.log("devtools panel create");
  },
);
