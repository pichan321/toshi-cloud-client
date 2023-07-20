import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './utils/Redux/store.js';
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
//window.location.origin
root.render(
      <Provider store={store}>
      <Auth0Provider
    domain="dev-qi6tdasmjtbp226c.us.auth0.com"
    clientId="tU3bRZIN5qoka4fS5DRC3CgSlhv93cKw"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
      </Provider>
);
