import "../global.css";

import React from "react";

import { ThemeProvider } from "@acme/ui";

export interface TailWindProviderProps {
  children?: React.ReactNode;
}

const TailWindProvider: React.FC<TailWindProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

TailWindProvider.displayName = "TailWindProvider";

export { TailWindProvider };
