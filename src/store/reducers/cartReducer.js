import * as aT from '../actionTypes/cartActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  id: null,
  hash: '',
  total_amount: 0,
  cart_items: [], // cart_items must always be an array of objects having product_id and quantity.
  cart_count: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_NEW_CART_ITEM: {
      {
        const { product_id, quantity, hash, amount, cart_count } = action.data;
        const newstate = { ...state };
        newstate.cart_items = [
          ...newstate.cart_items,
          { product_id, quantity },
        ];
        newstate.hash = hash;
        newstate.total_amount += amount;
        newstate.cart_count = cart_count;
        return newstate;
      }
    }
    case aT.UPDATE_CART_ITEM: {
      {
        const { product_id, quantity, amount } = action.data;
        const newstate = { ...state };
        const newCartItems = newstate.cart_items.map(item => {
          if (item.product_id !== product_id) return item;
          else {
            newstate.total_amount +=
              (amount / quantity) * (quantity - item.quantity);
            return { product_id, quantity };
          }
        });
        newstate.cart_items = newCartItems;
        return newstate;
      }
    }

    default:
      return state;
  }
};

export default cartReducer;
