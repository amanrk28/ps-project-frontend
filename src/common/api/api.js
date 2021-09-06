import config from '../../../config';
import { getAuthToken } from '../../utils/localStorage';

const server_url = `${config.SERVER_URL}:${config.SERVER_PORT}`;

const callAPI = async (method, url, data = {}) => {
  const token = getAuthToken();
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers = {
      ...headers,
      Authorization: `Token ${token}`,
    };
  }
  const options = {
    method,
    headers,
  };
  if (method !== 'get') {
    options.body = JSON.stringify(data);
  }
  return fetch(server_url + url, options).then(res => res.json());
};
