import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import * as aT from '../actionTypes/cartActionTypes';
import {
  createCartItemApi,
  createOrderFromCartApi,
  getCartItemsApi,
  updateCartItemApi,
} from '../../common/api';
import { setOrderItem } from './orderActions';
import { setLoaderTrue, setLoaderFalse } from './authActions';
import { ADDRESS_FIELDS } from 'utils/utils';

const set_all_cart_items = data => ({
  type: aT.SET_ALL_CART_ITEMS,
  data,
});

const set_cart_item = data => ({
  type: aT.SET_NEW_CART_ITEM,
  data,
});

const update_cart_item = data => ({
  type: aT.UPDATE_CART_ITEM,
  data,
});

export const resetCart = () => ({
  type: aT.RESET_CART,
});

export const getCartItems = () => dispatch => {
  dispatch(setLoaderTrue());
  getCartItemsApi()
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      dispatch(setLoaderFalse());
      if (data && Array.isArray(data) && data.length > 0) {
        const {
          cart_count,
          cart: { hash },
        } = data[0];
        const resData = {
          cart_count,
          hash,
          cart_items: [...data],
        };
        dispatch(set_all_cart_items(resData));
      }
    })
    .catch(err => {
      NotifyMe('error', err);
      console.log(err);
    });
};

export const addCartItem = product_id => {
  return dispatch => {
    const request_data = { product_id };
    dispatch(setLoaderTrue());
    createCartItemApi(request_data)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setLoaderFalse());
        const dispatch_data = {
          product_id: data.product.id,
          quantity: data.quantity,
          hash: data.cart.hash,
          amount: data.amount,
          cart_count: data.cart_count,
        };
        dispatch(set_cart_item(dispatch_data));
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      });
  };
};

export const updateCartItem = ({ product_id, quantity }) => {
  return dispatch => {
    dispatch(setLoaderTrue());
    updateCartItemApi(product_id, { quantity })
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        const { product, quantity, amount } = data;
        dispatch(setLoaderFalse());
        dispatch(
          update_cart_item({
            product_id: product.id,
            quantity,
            amount,
            price: product.price,
          })
        );
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      });
  };
};

const checkIsUserDataComplete = user => {
  let isComplete = true;
  ADDRESS_FIELDS.map(x => {
    if (!user.address[x.id]) isComplete = false;
  });
  [('first_name', 'last_name', 'phone_number')].map(x => {
    if (!user[x]) isComplete = false;
  });
  return isComplete;
};

export const createOrderFromCart = (reqData = {}, onSuccess) => {
  return (dispatch, getState) => {
    let user = {};
    if (Object.keys(reqData).length > 0) user = reqData;
    else user = getState().auth;
    if (!checkIsUserDataComplete(user)) {
      NotifyMe('error', 'Fill your details to proceed with the order');
      return;
    }
    const { hash } = getState().cart;
    reqData.cart_hash = hash;
    createOrderFromCartApi(reqData)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setOrderItem(data));
        dispatch(resetCart());
        onSuccess(data.id);
      })
      .catch(err => {
        NotifyMe('error', err);
        console.log(err);
      });
  };
};
