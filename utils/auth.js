import {getStorage, setStorage} from './storage'

export function getToken() {
    return getStorage('access_token') || '';
}
export function setToken(value) {
  setStorage('access_token', value);
}
