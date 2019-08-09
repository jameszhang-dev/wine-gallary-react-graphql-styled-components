import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { init } from '@sentry/browser';

import * as serviceWorker from './serviceWorker';
import App from './App';

import './styles/index.scss';

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
if (SENTRY_DSN) {
  init({
    dsn: SENTRY_DSN,
  });
}

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// Allows hot module replacement (HMR) for create-react-app
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = import('./App').default;
    ReactDOM.render(
      <Router history={history}>
        <NextApp />
      </Router>,
      document.getElementById('root')
    );
  });
}

serviceWorker.register();
