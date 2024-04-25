import { DataLayerProviders } from '@mfe-tutorial/data';
import { Toaster } from '@mfe-tutorial/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const element = document.getElementById('root');

if (!element) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(element);

root.render(
  <StrictMode>
    <DataLayerProviders>
      <Toaster />
      <App />
    </DataLayerProviders>
  </StrictMode>
);
