import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { rootReducer } from '../reducers';

export function configureStore() {
  const middlewares = [thunkMiddleware]; //add middelware is necessary
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composedWithDev =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = composedWithDev(middlewareEnhancer);

  const store = createStore(rootReducer, undefined, composedEnhancers);

  return store;
}
