export const COMPANY_NAME = 'Retailr';

const LOGO_MAIN =
  'https://res.cloudinary.com/retailr/image/upload/v1634159252/products/logoMain_wdwznx.webp';
export default LOGO_MAIN;

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
  let uploadObj = { name: file.name };
  if (res && res.secure_url) uploadObj.url = res.secure_url;
  return uploadObj;
}

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const convertDateStampToHumanDate = dateString => {
  const dateObj = new Date(dateString);
  if (dateObj) {
    let date = dateObj.getDate();
    date = date.toString().length === 1 ? '0' + date : date;
    let month = dateObj.getMonth() + 1;
    month = month.toString().length === 1 ? '0' + month : month;
    const year = dateObj.getFullYear();
    const day = dateObj.getDay();
    const str = `${DAYS[day]} - ${date}/${month}/${year}`;
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

export const ADDRESS_FIELDS = [
  { id: 'house_no', name: 'House No' },
  { id: 'street', name: 'Street' },
  { id: 'city', name: 'City' },
  { id: 'pincode', name: 'Pincode' },
];

export const getAddressString = addressObj => {
  let address = '';
  ADDRESS_FIELDS.forEach(item => {
    if (addressObj[item.id]) address += addressObj[item.id];
    if (item === 'city') address += ' - ';
    else if (item !== 'pincode') address += ', ';
  });
  return address;
};
