import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

export const history = createBrowserHistory();

const configureStore = () => {
  let _middleware = applyMiddleware(routerMiddleware(history), thunk);

  const with_redux_devtools = composeWithDevTools(_middleware);

  return createStore(rootReducer(history), with_redux_devtools);
};

export const store = configureStore();
