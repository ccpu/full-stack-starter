import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeToggle } from "@acme/ui";

import { TailWindProvider } from "../components/TailWindProvider";
import { NewTab } from "./NewTab";

const appElement = document.getElementById("app");
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <TailWindProvider>
        <ThemeToggle />
        <NewTab />
      </TailWindProvider>
    </React.StrictMode>,
  );
}
