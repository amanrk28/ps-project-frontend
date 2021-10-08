import * as aT from '../actionTypes/cartActionTypes';

// const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  id: null,
  hash: '',
  total_amount: 0,
  cart_item_ids: [], // cart_item_ids must always have array of product_id present in cart
  cart_items: [], // cart_items must always be an array of objects having product_id and quantity.
  cart_count: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_ALL_CART_ITEMS: {
      {
        const { hash, cart_items } = action.data;
        const newstate = { ...state };
        let totalAmount = 0;
        const newCartItems = cart_items.map(item => {
          totalAmount += item.amount;
          return { product_id: item.product.id, quantity: item.quantity };
        });
        newstate.cart_items = newCartItems;
        newstate.cart_item_ids = newCartItems.map(x => x.product_id);
        newstate.cart_count = newCartItems.length;
        newstate.total_amount = totalAmount;
        newstate.hash = hash;
        return newstate;
      }
    }
    case aT.SET_NEW_CART_ITEM: {
      {
        const { product_id, quantity, hash, amount } = action.data;
        const newstate = { ...state };
        newstate.cart_items = [
          ...newstate.cart_items,
          { product_id, quantity },
        ];
        newstate.cart_item_ids = newstate.cart_items.map(x => x.product_id);
        newstate.hash = hash;
        newstate.total_amount += amount;
        newstate.cart_count = newstate.cart_items.length;
        return newstate;
      }
    }
    case aT.UPDATE_CART_ITEM: {
      {
        const { product_id, quantity, amount, price } = action.data;
        const newstate = { ...state };
        let newCartItems = [];
        if (quantity === 0) {
          newCartItems = newstate.cart_items.filter(
            x => x.product_id !== product_id
          );
          newstate.total_amount -= price;
        } else {
          newCartItems = newstate.cart_items.map(item => {
            if (item.product_id !== product_id) return item;
            else {
              newstate.total_amount +=
                (amount / quantity) * (quantity - item.quantity);
              return { product_id, quantity };
            }
          });
        }
        newstate.cart_items = newCartItems;
        newstate.cart_item_ids = newCartItems.map(x => x.product_id);
        newstate.cart_count = newCartItems.length;
        return newstate;
      }
    }
    case aT.RESET_CART: {
      return initialState;
    }

    default:
      return state;
  }
};

export default cartReducer;
