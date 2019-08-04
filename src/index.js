import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import reducer from './store/reducers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);
// console.dir(store.getState());
// store.subscribe(() => {
//   console.dir(store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
