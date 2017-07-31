// We import Redux and Redux-saga dependencies
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import isAuthenticated from './utils/authentication';

const initialState = Immutable.fromJS({
  auth: isAuthenticated()
});

// The function in charge of creating and returning the store of the app
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleware = routerMiddleware(hashHistory);
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, routeMiddleware)
  );
  // rootSaga starts all the sagas in parallel
  sagaMiddleware.run(rootSaga);

  return store; // Return the state 
}
export default configureStore;