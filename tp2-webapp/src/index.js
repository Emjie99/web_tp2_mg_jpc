import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain=""
  clientId=""
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  >
    <App />
  </Auth0Provider>
);