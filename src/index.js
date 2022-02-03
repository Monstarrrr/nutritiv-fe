import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import entities from './Redux/config/entities';

const store = createStore(
  entities,
  /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    trace: true
  })
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);