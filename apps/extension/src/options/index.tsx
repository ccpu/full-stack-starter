import { ThemeProvider } from '@internal/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './Options';

import '../global.css';

// import "./index.css";

const appElement = document.getElementById('app');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
