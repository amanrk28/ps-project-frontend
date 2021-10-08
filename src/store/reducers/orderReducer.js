import { convertDateStampToHumanDate } from 'utils/utils';
import * as aT from '../actionTypes/orderActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  orderList: [],
  orderItem: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_ORDERS: {
      {
        const newstate = { ...state };
        for (let item of action.data) {
          for (let key of Object.keys(item)) {
            if (key.indexOf('date') > -1) {
              item[key] = convertDateStampToHumanDate(item[key]);
            }
          }
        }
        newstate.orderList = [...action.data];
        return newstate;
      }
    }
    case aT.SET_ORDER_ITEM:
      return update(state, { orderItem: { ...action.data } });

    case aT.RESET_ORDER:
      return initialState;

    default:
      return state;
  }
};

export default orderReducer;
