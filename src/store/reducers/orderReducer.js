import * as aT from '../actionTypes/orderActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  orderList: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_ORDERS:
      return update(state, { ...state });
    default:
      return state;
  }
};

export default orderReducer;
