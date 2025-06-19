import React from "react";
import ReactDOM from "react-dom/client";

import { TailWindProvider } from "../components/TailWindProvider";
import { DevTools } from "./DevTools";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <TailWindProvider>
        <DevTools />
      </TailWindProvider>
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
