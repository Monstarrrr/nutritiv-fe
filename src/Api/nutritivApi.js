import axios from 'axios';
import { storageKeys } from '../Helpers/localStorage';
import { 
  updateAuthStatus
} from '../Redux/reducers/user';

// # INJECT STORE TO PREVENT IMPORT ISSUES #
let store
export const injectStore = _store => {
  store = _store
}

// # API INSTANCE #
const nutritivApi = axios.create({
  baseURL: 'http://localhost:3001/', // Change in pro
})

// [DELETE] /carts/
export const apiDeleteCartItem = async (props) => {
  const { userId, productId, load } = props;
  try {
    const { data } = await nutritivApi.delete(
      `/carts/${userId}/${productId}/${load}`,
    )
    console.log('# /carts/ :', data)
    
    return (
      data
    )
  } catch(err) {
    console.log(
      '# [delete] /carts/ code :', 
      err.response.status
    )
  }
}

// # INTERCEPTORS #
// on request
nutritivApi.interceptors.request.use(req => {
  const refreshToken = localStorage.getItem(storageKeys.refreshToken);
  const accessToken = localStorage.getItem(storageKeys.accessToken);
  req.headers.access_token = accessToken;
  req.headers.refresh_token = refreshToken;
  console.log('# Interceptor req :', req)
  return req;
}, function (err) {
  return Promise.reject(err)
})

// on response
nutritivApi.interceptors.response.use(res => {
  // set tokens in localStorage
  if(res.headers.access_token || res.headers.refresh_token) {
    localStorage.setItem(
      storageKeys.accessToken,
      res.headers.access_token
    )
    localStorage.setItem(
      storageKeys.refreshToken, 
      res.headers.refresh_token
    )
  }
  if(res.data.loggedIn) {
    store.dispatch(updateAuthStatus({
      loggedIn: res.data.loggedIn,
    }))
  }
  console.log("# Interceptor res :", res);
  return res;
}, function (err) {
  if(err.status === 429) {
    console.error(
      '# Too many API requests :', 
      err.response.status
    )
  }
  return Promise.reject(err)
})

export default nutritivApi;