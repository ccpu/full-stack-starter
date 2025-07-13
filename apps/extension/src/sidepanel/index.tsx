import React from 'react';
import ReactDOM from 'react-dom/client';

import { TailWindProvider } from '../components/TailWindProvider';

import { SidePanel } from './SidePanel';

const appElement = document.getElementById('app');
if (appElement) {
  ReactDOM.createRoot(appElement).render(
    <React.StrictMode>
      <TailWindProvider>
        <SidePanel />
      </TailWindProvider>
    </React.StrictMode>,
  );
}
