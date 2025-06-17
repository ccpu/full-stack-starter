import React from "react";
import ReactDOM from "react-dom/client";

import { NewTab } from "./NewTab";

import "./index.css";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <NewTab />
    </React.StrictMode>,
  );
}
