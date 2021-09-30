import * as aT from '../actionTypes/authActionTypes';

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
  token: null,
  user_id: null,
  first_name: '',
  last_name: '',
  full_name: '',
  email: '',
  phone_number: '',
  is_store_owner: false,
  is_admin: false,
  username: '',
  address: {
    house_no: '',
    street: '',
    city: '',
    pincode: '',
  },
  isCheckingAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case aT.SET_USER:
      return update(state, {
        user_id: action.data.id,
        first_name: action.data.first_name || '',
        last_name: action.data.last_name || '',
        full_name: action.data.full_name || '',
        email: action.data.email,
        phone_number: action.data.phone_number || '',
        username: action.data.username,
        is_store_owner: action.data.is_store_owner || false,
        is_admin: action.data.is_admin || false,
        address: { ...action.data.address } || {},
      });
    case aT.SET_TOKEN:
      return update(state, { token: action.data });

    case aT.RESET_USER:
      return initialState;

    case aT.SET_AUTH_CHECKING_TRUE:
      return update(state, { isCheckingAuth: true });

    case aT.SET_AUTH_CHECKING_FALSE:
      return update(state, { isCheckingAuth: false });

    default:
      return state;
  }
};
export default authReducer;
