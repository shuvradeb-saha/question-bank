// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import './static/css/app.css';
// Import root app
import App from './containers/App';

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

unregister();
