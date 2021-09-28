import { convertDateStampToHumanDate } from 'utils/utils';
import * as aT from '../actionTypes/orderActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  orderList: [],
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
    default:
      return state;
  }
};

export default orderReducer;
