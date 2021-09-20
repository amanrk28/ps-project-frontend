import { push } from 'connected-react-router';
import * as aT from '../actionTypes/authActionTypes';
import { signupApi, loginApi, verifyTokenApi } from '../../common/api';
import { EMAIL_REGEX } from 'utils/utils';
import { setAuthToken, clearAllStorages } from 'utils/localStorage';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';

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

export const setAuthCheckingTrue = () => ({ type: aT.SET_AUTH_CHECKING_TRUE });
export const setAuthCheckingFalse = () => ({
  type: aT.SET_AUTH_CHECKING_FALSE,
});

export const setAuthCredentials = data => dispatch => {
  if (data.token) {
    setAuthToken(data.token);
    dispatch(set_token(data.token));
  }
  if (data.user) dispatch(set_user(data.user));
};

export const signupUser = req_data => dispatch => {
  const { email, phone_number, password } = req_data;
  const emailRegex = new RegExp(EMAIL_REGEX);

  if (phone_number.length !== 10)
    return NotifyMe('error', 'Invalid Phone Number. Try again');

  if (email && !emailRegex.test(email.trim()))
    return NotifyMe('error', 'Invalid Email. Try again');

  if (!password)
    return NotifyMe('error', 'Password not provided. Cannot create user');

  signupApi(req_data)
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      NotifyMe('success', 'Signup Successful');
      dispatch(setAuthCredentials(data));
      dispatch(push('/'));
    })
    .catch(err => {
      NotifyMe('error', `${err}!`);
      console.log(err);
    });
};

export const loginUser = req_data => dispatch => {
  const { email, password } = req_data;
  const emailRegex = new RegExp(EMAIL_REGEX);
  if (!email || !password || (email && !emailRegex.test(email.trim())))
    return NotifyMe('error', 'Invalid/ Incomplete Credentials provided');

  loginApi(req_data)
    .then(res => {
      const { status, data, msg } = res;
      if (!status) throw msg;
      NotifyMe('success', 'Login Successful');
      dispatch(setAuthCredentials(data));
      dispatch(push('/'));
    })
    .catch(err => {
      NotifyMe('error', `${err}!`);
      console.log(err);
    });
};

export const verifyToken = () => dispatch => {
  dispatch(setAuthCheckingTrue());
  verifyTokenApi()
    .then(res => {
      const { status, data, msg } = res;
      dispatch(setAuthCheckingFalse());
      if (!status) throw msg;
      if (data !== null) {
        dispatch(setAuthCredentials(data));
        dispatch(push('/'));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const logout = () => dispatch => {
  dispatch(resetUser());
  clearAllStorages();
};
