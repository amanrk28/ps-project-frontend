import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import productReducer from './productReducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
  });

export default rootReducer;
