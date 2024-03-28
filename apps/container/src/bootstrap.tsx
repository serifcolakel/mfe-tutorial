import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const element = document.getElementById('root');

if (!element) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(element);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
