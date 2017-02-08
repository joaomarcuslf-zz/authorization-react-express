import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'whatwg-fetch';

import Container from './components/Container.jsx';
import HelloWorld from './components/helloworld/HelloWorld.jsx';
import RegisterPage from './components/register/RegisterPage.jsx';
import LoginPage from './components/login/LoginPage.jsx';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={HelloWorld} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
);
