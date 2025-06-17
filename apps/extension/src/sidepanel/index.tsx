import React from "react";
import ReactDOM from "react-dom/client";

import { SidePanel } from "./SidePanel";

import "./index.css";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <SidePanel />
    </React.StrictMode>,
  );
}
