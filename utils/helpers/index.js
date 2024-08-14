import { useMessage } from "naive-ui";
const message = useMessage();
const SECRET_KEY = "my_little_pony";
import CryptoJS from "crypto-js";

export const formatCurrency = (number) => {
    if(!number) return 0;
    if(typeof +number !== 'number') return 0;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(number);
  }



  export function timeFormatter(value) {
    if (!value || value === '' || (typeof value !== 'string')) return "--";
    
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return "--";
    
    const [_, year, month, day] = match;
    return `${day}/${month}/${year}`;
  }

  export function setMaxText (text, max) {
    if (!text) return "";
    if (text.length > max) {
      return `${text.substring(0, max)}...`;
    }
    return text;
  }

  export function encryptData (data) {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  }
    
  export function decryptData (data) {
    return CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

  export function setLocalStorage(key, value) {
    const encryptItem = encryptData(JSON.stringify(value));
  localStorage.setItem(key, encryptItem);
}

export function getLocalStorage(key) {
  const encryptItem = localStorage.getItem(key);
  if (!encryptItem) return "";
  const data = decryptData(encryptItem);
  return JSON.parse(data);
}

export function setUserInLocalStorage(user) {
  setLocalStorage("user", user);
}

export function getUserFromLocalStorage() {
  return getLocalStorage("user");
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function isLogin() {
  const user = getUserFromLocalStorage();
  return user !== "";
}