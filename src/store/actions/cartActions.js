import * as aT from '../actionTypes/cartActionTypes';
import { createCartItemApi, updateCartItemApi } from '../../common/api';

const set_cart_item = data => ({
  type: aT.SET_NEW_CART_ITEM,
  data,
});

const update_cart_item = data => ({
  type: aT.UPDATE_CART_ITEM,
  data,
});

export const setCartItem = product_id => {
  return dispatch => {
    const request_data = { product_id };
    createCartItemApi(request_data)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        const dispatch_data = {
          product_id: data.product.id,
          quantity: data.quantity,
          hash: data.cart.hash,
          amount: data.amount,
          cart_count: data.cart_count,
        };
        dispatch(set_cart_item(dispatch_data));
      })
      .catch(err => console.log(err));
  };
};

export const updateCartItem = ({ product_id, quantity }) => {
  return dispatch => {
    updateCartItemApi(product_id, quantity)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        const dispatch_data = {
          product_id: data.product.id,
          quantity: data.quantity,
          amount: data.amount,
        };
        dispatch(update_cart_item(dispatch_data));
      })
      .catch(err => console.log(err));
  };
};
