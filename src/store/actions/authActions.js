import { push } from 'connected-react-router';
import * as aT from '../actionTypes/authActionTypes';
import {
  signupApi,
  loginApi,
  verifyTokenApi,
  updateUserApi,
} from '../../common/api';
import { EMAIL_REGEX } from 'utils/utils';
import { setAuthToken, clearAllStorages } from 'utils/localStorage';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import { getCartItems, addCartItem, resetCart } from './cartActions';
import { resetOrder } from './orderActions';

const set_user = data => ({
  type: aT.SET_USER,
  data,
});

const set_token = data => ({
  type: aT.SET_TOKEN,
  data,
});

const resetUser = () => ({
  type: aT.RESET_USER,
});

export const setLoaderTrue = () => ({
  type: aT.SET_LOADER_TRUE,
});

export const setLoaderFalse = () => ({
  type: aT.SET_LOADER_FALSE,
});

const userRedirectAfterAuth = user => {
  let route = '/';
  if (user.is_store_owner) route = '/admin';
  return route;
};

export const setAuthCredentials = data => dispatch => {
  if (data.token) {
    setAuthToken(data.token);
    dispatch(set_token(data.token));
  }
  if (data.user) dispatch(set_user(data.user));
};

export const signupUser = (req_data, cb) => (dispatch, getState) => {
  const { email, phone_number, password } = req_data;
  const emailRegex = new RegExp(EMAIL_REGEX);

  if (phone_number.length !== 10)
    return NotifyMe('error', 'Invalid Phone Number. Try again');

  if (email && !emailRegex.test(email.trim()))
    return NotifyMe('error', 'Invalid Email. Try again');

  if (!password)
    return NotifyMe('error', 'Password not provided. Cannot create user');

  const { location } = getState().router;
  signupApi(req_data)
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      NotifyMe('success', 'Signup Successful');
      dispatch(setAuthCredentials(data));
      if (location.hash && location.hash === '#addtocart') {
        const id = location.state;
        dispatch(addCartItem(id));
      }
      dispatch(push(userRedirectAfterAuth(data.user)));
    })
    .catch(err => {
      NotifyMe('error', `${err}!`);
      console.log(err);
    })
    .finally(() => {
      if (cb) cb();
    });
};

export const loginUser = (req_data, cb) => (dispatch, getState) => {
  const { email, password } = req_data;
  const emailRegex = new RegExp(EMAIL_REGEX);
  if (!email || !password || (email && !emailRegex.test(email.trim()))) {
    if (cb) cb();
    return NotifyMe('error', 'Invalid/ Incomplete Credentials provided');
  }
  const { location } = getState().router;
  loginApi(req_data)
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      NotifyMe('success', 'Login Successful');
      dispatch(setAuthCredentials(data));
      if (location.hash && location.hash === '#addtocart') {
        const id = location.state;
        dispatch(addCartItem(id));
      } else if (!data.user.is_admin && !data.user.is_store_owner) {
        dispatch(getCartItems());
      }
      dispatch(push(userRedirectAfterAuth(data.user)));
    })
    .catch(err => {
      NotifyMe('error', `${err}!`);
      console.log(err);
    })
    .finally(() => {
      if (cb) cb();
    });
};

export const verifyToken = () => (dispatch, getState) => {
  dispatch(setLoaderTrue());
  verifyTokenApi()
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      dispatch(setLoaderFalse());
      if (data !== null) {
        dispatch(setAuthCredentials(data));
        if (getState().router.location.pathname.indexOf('login') > -1)
          dispatch(push(userRedirectAfterAuth(data.user)));
      }
    })
    .catch(err => {
      dispatch(setLoaderFalse());
      console.log(err);
    });
};

export const logout = () => dispatch => {
  dispatch(resetUser());
  dispatch(resetCart());
  dispatch(resetOrder());
  clearAllStorages();
  NotifyMe('success', 'Logged out');
  dispatch(push('/login'));
};

export const updateUserDetails =
  ({ id, userData, cb }) =>
  dispatch => {
    updateUserApi(id, userData)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setAuthCredentials({ user: data }));
        NotifyMe('success', 'User Details updated successfully');
        if (cb) cb();
      })
      .catch(err => {
        NotifyMe('error', err);
        console.log(err);
      });
  };
