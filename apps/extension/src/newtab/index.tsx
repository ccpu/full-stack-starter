import "../global.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, ThemeToggle } from "@acme/ui";

import { NewTab } from "./NewTab";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <ThemeToggle />
        <NewTab />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
