export const setAuthToken = token => {
  return localStorage.setItem('xxx-token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('xxx-token');
};
