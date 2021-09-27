import * as aT from '../actionTypes/productActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  products: [],
  // Fields in products array:
  // id, name, price, image, stock, is_available, description, category, added_by
  product_categories: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_PRODUCTS:
      return update(state, { products: action.data });
    case aT.SET_PRODUCT_CATEGORIES:
      return update(state, { product_categories: action.data });
    case aT.SET_NEW_PRODUCT:
      return update(state, { products: [action.data, ...state.products] });
    case aT.SET_UPDATED_PRODUCT: {
      {
        const newstate = { ...state };
        const newProductIndex = newstate.products.findIndex(
          x => x.id === action.data.id
        );
        newstate.products[newProductIndex] = { ...action.data };
        return newstate;
      }
    }
    default:
      return state;
  }
};

export default productReducer;
