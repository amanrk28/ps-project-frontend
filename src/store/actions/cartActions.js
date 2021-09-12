import * as aT from '../actionTypes/cartActionTypes';
import {
  createCartItemApi,
  getCheckoutDataApi,
  updateCartItemApi,
} from '../../common/api';

const set_cart_item = data => ({
  type: aT.SET_NEW_CART_ITEM,
  data,
});

const update_cart_item = data => ({
  type: aT.UPDATE_CART_ITEM,
  data,
});

const set_cart_items_for_checkout = data => ({
  type: aT.SET_CART_ITEMS_FOR_CHECKOUT,
  data,
});

export const addCartItem = product_id => {
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
        const { product_id, quantity, amount } = data;
        dispatch(update_cart_item({ product_id, quantity, amount }));
      })
      .catch(err => console.log(err));
  };
};

export const getCheckoutData = () => {
  return (dispatch, getState) => {
    const { hash } = getState().cart;
    if (!hash || hash.length !== 8)
      return console.log('Cart Hash not found! Try adding items to cart');
    getCheckoutDataApi({ cart_hash: hash })
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(set_cart_items_for_checkout(data));
      })
      .catch(err => console.log(err));
  };
};
