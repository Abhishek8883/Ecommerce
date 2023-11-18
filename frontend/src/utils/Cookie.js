import Cookies from 'js-cookie';
import { EXPIRATION_DAYS } from '../constants/Constants';

// Function to set a cookie
export const setCookie = (cookieName, cookieValue) => {
  Cookies.set(cookieName, cookieValue, { expires: EXPIRATION_DAYS });
};

// Function to get a cookie value
export const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

// Function to remove a cookie
export const removeCookie = (cookieName) => {
  Cookies.remove(cookieName);
};

