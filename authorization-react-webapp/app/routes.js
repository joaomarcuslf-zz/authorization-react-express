import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Container from './components/Container';
import HelloWorld from './components/helloworld/HelloWorld';
import Register from './components/register/Register';
import LoginPage from './components/login/LoginPage';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={HelloWorld} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={LoginPage} />
      </Route>
    </Router>
  );
};

export default Routes;

