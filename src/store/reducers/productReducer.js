import * as aT from '../actionTypes/productActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_PRODUCTS:
      return update(state, { products: action.data });
    default:
      return state;
  }
};

export default productReducer;
