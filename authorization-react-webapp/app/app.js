import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'whatwg-fetch';

import Container from './components/Container';
import HelloWorld from './components/helloworld/HelloWorld';
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={HelloWorld} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer'),
);
