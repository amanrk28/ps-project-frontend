export const COMPANY_NAME = 'Retailr';

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmail = email => {
  const emailRegex = new RegExp(EMAIL_REGEX);
  return emailRegex.test(email);
};

export const detectKeyPress = e => {
  const returnObj = {};
  if (e.key === 'Enter') returnObj.enter = true;
  else if (e.keyCode === '13' || e.keyCode === 13) returnObj.enter = true;
  return returnObj;
};

export const isObject = objectToCheck => {
  return Object.prototype.toString.call(objectToCheck) === '[object Object]';
};

export const createElementWithEvent = ({
  value,
  dataname,
  onChange,
  event,
  dataProps,
}) => {
  const elem = document.createElement('input');
  if (dataProps && isObject(dataProps) && Object.keys(dataProps).length) {
    for (let item in dataProps) {
      if (dataProps.hasOwnProperty(item)) {
        elem.setAttribute(item, dataProps[item]);
      }
    }
  }
  elem.setAttribute('data-name', dataname);
  elem.setAttribute('value', value);
  elem.addEventListener(event, onChange);
  elem.dispatchEvent(new Event(event));
  return elem;
};

const uploadFileApi = async formData => {
  const { REACT_APP_CDN_UPLOAD_URL, REACT_APP_CDN_UPLOAD_PRESET } = process.env;
  formData.append('upload_preset', REACT_APP_CDN_UPLOAD_PRESET);
  const options = {
    method: 'post',
    body: formData,
  };
  return fetch(REACT_APP_CDN_UPLOAD_URL, options).then(res => res.json());
};

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await uploadFileApi(formData);
  const uploadObj = { name: file.name };
  if (res && res.url) uploadObj.url = res.url;
  return uploadObj;
}

export const convertDateStampToHumanDate = dateString => {
  const dateObj = new Date(dateString);
  if (dateObj) {
    let date = dateObj.getDate();
    date = date.toString().length === 1 ? '0' + date : date;
    let month = dateObj.getMonth();
    month = month.toString().length === 1 ? '0' + month : month;
    const year = dateObj.getFullYear();
    const str = `${date}/${month}/${year}`;
    return str;
  } else {
    return dateString;
  }
};

export const getSearchStringFromObject = searchObject => {
  const query = Object.entries(searchObject).reduce(
    (accumulator, currentValue) => {
      let thisReturnValue = '';
      if (accumulator.length > 0) {
        thisReturnValue = '&';
      }
      const [key, value] = currentValue;
      return accumulator + thisReturnValue + `${key}=${value}`;
    },
    ''
  );
  return '?' + query;
};

export const queryStringify = obj => {
  let arr = [];
  for (let x in obj) {
    arr.push(`${x}=${obj[x]}`);
  }
  console.log;
  return arr.join('&');
};
