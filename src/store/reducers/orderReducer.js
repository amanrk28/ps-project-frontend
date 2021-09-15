import * as aT from '../actionTypes/orderActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  orderList: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default orderReducer;
