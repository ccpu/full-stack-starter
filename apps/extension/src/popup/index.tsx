import * as React from "react";
import { createRoot } from "react-dom/client";

import { TailWindProvider } from "../components/TailWindProvider";
import { Popup } from "./Popup";

const appElement = document.getElementById("app");
if (appElement) {
  createRoot(appElement).render(
    <React.StrictMode>
      <TailWindProvider>
        <Popup />
      </TailWindProvider>
    </React.StrictMode>,
  );
}
