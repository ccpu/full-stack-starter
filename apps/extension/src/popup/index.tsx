import * as React from "react";
import { createRoot } from "react-dom/client";

import { Popup } from "./Popup";

import "../styles.css";

const appElement = document.getElementById("app");
if (appElement) {
  createRoot(appElement).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
  );
}
