// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

// Import root app
import App from './containers/App';

// Import i18n messages

/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './state/configureStore';

// Import ServiceWorker
import { unregister } from './serviceWorker';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);

// TODO: Maybe figure out a good way to use service-worker.js instead of disabling it?
unregister();
