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
    const { data } = await nutritivApi.post(
      '/auth/login', 
      { loginData }
    )
    return data;
  } catch (err) {
    console.log('# /auth/login err :', err)
  }
};
// /users/self
export const apiGetUser = async () => {
  console.log('# user/self')
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
    const { data: products } = await nutritivApi.get(
      `/products/?limit=${limit}`,
    )
    return products.products;
  } catch (err) {
    console.log(`# /products/?limit err :`, err)
  }
}
// products/countInStock
export const apiGetCountInStock = async (productId) => {
  try {
    const { data } = await nutritivApi.get(
      `/products/countInStock/${productId}`,
    )
    console.log('# /products/countInStock res :', data)
    return data;
  } catch (err) {
    console.log(`# /products/countInStock err :`, err)
  }
}
// carts/addToCart
export const apiAddToCart = async (item) => {
  try {
    const { data } = await nutritivApi.post(
      `/carts/addToCart/`,
      item
    )
    console.log('# /carts/addToCart res :', data)
    return;
  } catch (err) {
    console.log(`# /carts/addToCart err :`, err)
  }
}
// /stripe/secret
// export const apiGetCheckoutSecret = async () => {
//   try {
//     const { data: clientSecret } = await nutritivApi.get(
//       '/stripe/secret',
//     )
//     return clientSecret;
//   } catch (err) {
//     console.error('# /stripe/payment err', err)
//   }
// }
// /stripe/create-checkout-session
export const apiCreateCheckoutSession = async () => {
  try {
    const { data } = await nutritivApi.post(
      '/stripe/create-checkout-session',
    )
    return data;
  } catch (err) {
    console.error('# /stripe/create-checkout-session err')
    console.log(err)
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
    console.log('# res.data.loggedIn :', res.data.loggedIn)
    // update user token in store
    store.dispatch(updateAuthStatus({
      loggedIn: res.data.loggedIn,
    }))
  }
  console.log("# Interceptor res :", res);
  return res;
}, function (err) {
  if(err.status === 429) {
    console.log('# Too many API requests :', err)
  }
  return Promise.reject(err)
})

export default nutritivApi;