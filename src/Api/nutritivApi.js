import axios from 'axios';
import { storageKeys } from '../Helpers/localStorage';
import { updateAuthStatus } from '../Redux/reducers/user';

// INJECT STORE TO PREVENT IMPORT ISSUES
let store
export const injectStore = _store => {
  store = _store
}

// API INSTANCE
const nutritivApi = axios.create({
  baseURL: 'http://localhost:3001/', // Change in prod
})

// API CALLS
// /auth/login
export const apiLoginUser = async (loginData) => {
  try {
    await nutritivApi.post(
      '/auth/login', 
      { loginData }
    )
  } catch (err) {
    console.log('# /auth/login err :', err)
  }
};
// /users/self
export const apiGetUser = async () => {
  try {
    const { data } = await nutritivApi.get(
        '/users/self'
    )
    return data;
  } catch (err) {
    console.log('# /users/self err :', err)
  }
}
// /products
export const apiGetProducts = async (limit) => {
  try {
    const { data } = await nutritivApi.get(
      `/products/?limit=${limit}`,
    )
    return data;
  } catch (err) {
    console.log(`# /products/?limit err :`, err)
  }
}
// /stripe/payment
export const apiStripePayment = async () => {
  try {
    const { data } = await nutritivApi.post(
      '/stripe/payment',
    )
    return data;
  } catch (err) {
    console.error('# /stripe/payment err', err)
  }
}

// INTERCEPTORS
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
    // update user token in store
    store.dispatch(updateAuthStatus({
      loggedIn: res.data.loggedIn,
    }))
  }
  console.log("# Interceptor res :", res);
  return res;
}, function (err) {
  if(err.status === 429) {
    console.log('# 429 error :', err)
  }
  return Promise.reject(err)
})

export default nutritivApi;