import React from 'react';
// We import Provider
import { Provider } from 'react-redux';
// We need the store to be passed to Provider
import configureStore from './store';
// All the previous dependencies from Part1
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { AddGameContainer, GamesContainer } from './containers';
import { Home, Archive, Welcome, About, Contact } from './components';

// Call the configureStore function previously exported
const store = configureStore();

// Provider wraps our root component
const routes = (
/* We pass the store to the provider */
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Route>
      <Route path="/games" component={Archive}>
        <IndexRoute component={GamesContainer} />
        <Route path="add" component={AddGameContainer} />
      </Route>
    </Router>
  </Provider>
);

export default routes;