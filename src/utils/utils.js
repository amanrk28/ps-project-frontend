export const LOGO_URL = 'https://i.ibb.co/0Bm2xpD/logomain2.png';

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmail = email => {
  const emailRegex = new RegExp(EMAIL_REGEX);
  return emailRegex.test(email);
};
