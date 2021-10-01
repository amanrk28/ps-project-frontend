import * as aT from '../actionTypes/orderActionTypes';
import { getOrderListApi } from 'common/api';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import { getSearchStringFromObject } from 'utils/utils';
import { ORDER_STATUSES } from 'components/GlobalConstants';

const setOrderList = data => ({
  type: aT.SET_ORDERS,
  data,
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
