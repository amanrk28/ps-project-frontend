import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
const { REACT_APP_IS_REDUX_ENABLED } = process.env;

export const history = createBrowserHistory();

const configureStore = () => {
  let _middleware = applyMiddleware(routerMiddleware(history), thunk);

  let with_redux_devtools = '';
  if (REACT_APP_IS_REDUX_ENABLED) {
    with_redux_devtools = composeWithDevTools(_middleware);
  } else {
    with_redux_devtools = _middleware;
  }
  return createStore(rootReducer(history), with_redux_devtools);
};

export const store = configureStore();
