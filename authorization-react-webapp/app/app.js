/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import 'whatwg-fetch';

import Container from './components/Container.jsx';
import HelloWorld from './components/helloworld/HelloWorld.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Container}>
      <IndexRoute component={HelloWorld} />
    </Route>
  </Router>,
  document.getElementById('appContainer')
);
