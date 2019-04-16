import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from './reducers';
import createSagaMiddleware from "redux-saga";
import rootSaga from './sagas';

const initializeSagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(initializeSagaMiddleware))
);

initializeSagaMiddleware.run(rootSaga);

export default store;