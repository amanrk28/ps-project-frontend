const { REACT_APP_LS_TOKEN_KEY: tokenKey } = process.env;

export const setAuthToken = token => localStorage.setItem(tokenKey, token);

export const getAuthToken = () => localStorage.getItem(tokenKey);

export const lsSet = (key, value) => localStorage.setItem(key, value);

export const lsGet = key => localStorage.getItem(key);

export const lsRemove = key => localStorage.removeItem(key);

export const clearAllStorages = () => localStorage.clear();
