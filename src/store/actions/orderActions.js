import { push } from 'connected-react-router';
import * as aT from '../actionTypes/orderActionTypes';
import {
  cancelOrderApi,
  getOrderItemApi,
  getOrderListApi,
  updateOrderStatusApi,
} from 'common/api';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import { getSearchStringFromObject } from 'utils/utils';
import { ORDER_STATUSES } from 'components/GlobalConstants';
import { setLoaderTrue, setLoaderFalse } from './authActions';

const setOrderList = data => ({
  type: aT.SET_ORDERS,
  data,
});

const setUpdatedOrderInList = data => ({
  type: aT.SET_UPDATED_ORDER_IN_LIST,
  data,
});

export const setOrderItem = data => ({
  type: aT.SET_ORDER_ITEM,
  data,
});

export const resetOrder = () => ({
  type: aT.RESET_ORDER,
});

export const getOrdersList = ({ orderStatus, cb }) => {
  let searchObj = {
    all: true,
  };
  if (
    orderStatus &&
    orderStatus !== 'all' &&
    ORDER_STATUSES.find(x => x.id === orderStatus)
  ) {
    searchObj.status = orderStatus;
  }
  const searchString = getSearchStringFromObject(searchObj);
  return dispatch => {
    getOrderListApi(searchString)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        if (cb) cb();
        dispatch(setOrderList(data));
      })
      .catch(err => {
        NotifyMe('error', err);
        console.log(err);
      });
  };
};

export const getOrderItem = ({ id, cb }) => {
  return dispatch => {
    getOrderItemApi(id)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        if (cb) cb();
        dispatch(setOrderItem(data));
      })
      .catch(err => {
        NotifyMe('error', err);
        console.log(err);
        dispatch(push('/orders'));
      });
  };
};

export const updateOrderStatus = (id, orderStatus) => dispatch => {
  dispatch(setLoaderTrue());
  updateOrderStatusApi(id, orderStatus)
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      dispatch(setUpdatedOrderInList(data));
    })
    .catch(err => {
      NotifyMe('error', err);
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoaderFalse());
    });
};

export const cancelOrder = id => dispatch => {
  dispatch(setLoaderTrue());
  cancelOrderApi(id)
    .then(res => {
      const { status, msg } = res;
      if (!status) throw msg;
      NotifyMe('Order cancelled Successfully');
      dispatch(push('/orders'));
    })
    .catch(err => {
      NotifyMe('error', err);
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoaderFalse());
    });
};
