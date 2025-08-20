import { ThemeProvider } from '@internal/ui';

import React from 'react';
import '../global.css';

export interface TailWindProviderProps {
  children?: React.ReactNode;
}

const TailWindProvider: React.FC<TailWindProviderProps> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

TailWindProvider.displayName = 'TailWindProvider';

export { TailWindProvider };
