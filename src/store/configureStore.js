import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from '../reducers/rootReducer';
import SSEMiddleware from './SSEMiddleware';

export default function configureStore(initialState) {
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const middleware = [thunk, SSEMiddleware()];

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );
}
