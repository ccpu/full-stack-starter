import '../global.css';

import { ThemeProvider } from '@acme/ui';
import React from 'react';

export interface TailWindProviderProps {
  children?: React.ReactNode;
}

const TailWindProvider: React.FC<TailWindProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

TailWindProvider.displayName = 'TailWindProvider';

export { TailWindProvider };
