import axios from 'axios';
import { storageKeys } from '../Helpers/localStorage';
import { updateAuthStatus, updateUserCartQuantity } from '../Redux/reducers/user';

// # INJECT STORE TO PREVENT IMPORT ISSUES #
let store
export const injectStore = _store => {
  store = _store
}

// # API INSTANCE #
const nutritivApi = axios.create({
  baseURL: 'http://localhost:3001/', // Change in prod
})

// # API CALLS #
// ### auth ###
// [POST] /auth/login
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

// ### users ###
// [GET] /users/self
export const apiGetUserSelf = async () => {
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

// [PUT] /users/reset_password
export const apiUpdatePassword = async ({
  oldPass, newPass, confirmNewPass 
}) => {
  try {
    const { data } = await nutritivApi.put(
      `/users/reset_password`,
      { oldPass, newPass, confirmNewPass }
    )
    console.log('# /users/reset_password :', data)
    
    return data;
  } catch(err) {
    console.log('# [put] /users/reset_password err:', err)
    return err;
  }
}

// [PUT] /users/addAddress
export const apiAddUserAddress = async (props) => {
  try {
    const { data } = await nutritivApi.put(
      `/users/addAddress`,
      props
    )
    console.log('# /users/addAddress :', data)
    
    return data;
  } catch(err) {
    console.error('# [put] /users/addAddress code:', err.response.status)
  }
}

// ### products ###
// [GET] /products/?limit=X
export const apiGetProductsByLimit = async (limit) => {
  try {
    const { data: products } = await nutritivApi.get(
      `/products/?limit=${limit}`,
    )
    return products.products;
  } catch (err) {
    console.log(`# /products/?limit err :`, err)
  }
}
// [GET] /products/?start=x&end=y
export const apiGetProductsBySlice = async (start, end) => {
  try {
    console.log('# start, end :', start, end)
    const { data } = await nutritivApi.get(
      `/products/?start=${start}&end=${end}`,
    )
    console.log('# /products/?start=x&end=y :', data)
    
    return (
      data
    )
  } catch(err) {
    console.log('# [get] /products/?start=x&end=y err:', err)
  }
}
// [GET] /products/countInStock
export const apiGetCountInStock = async (productId) => {
  console.log('# products/countInStock req :', productId)
  try {
    const { data } = await nutritivApi.get(
      `/products/countInStock/${productId}`,
    )
    console.log('# products/countInStock res :', data)
    return data.countInStock;
  } catch (err) {
    console.log(`# /products/countInStock err :`, err)
    return null;
  }
}
// [GET] /products/tags
export const apiGetAllUniqueTags = async () => {
  try {
    const { data } = await nutritivApi.get(
      `/products/tags`
    )
    console.log('# /products/tags :', data.uniqueTags)
    return (
      data.uniqueTags
    )
  } catch(err) {
    console.log('# [get] /products/tags err:', err)
  }
}
// [GET] /products/findByTitle/:productTitle
export const apiGetProductByTitle = async (productTitle) => {
  try {
    const { data } = await nutritivApi.get(
      `/products/findByTitle/${productTitle}`,
    )
    return data.Product[0];
  } catch (err) {
    console.log(`# /products/findByTitle err :`, err)
  }
}

// ### carts ###
// [GET] carts/self
export const apiGetSelfCart = async () => {
  try {
    const { data } = await nutritivApi.get(
      `/carts/self`,
    )
    console.log('# /carts/self :', data)
    data.cart ? (
      store.dispatch(updateUserCartQuantity({
        cartQuantity: data.cart.totalQuantity,
      }))
    ) : (
      store.dispatch(updateUserCartQuantity({
        cartQuantity: 0,
      }))
    )
    return (
      data?.cart
    )
  } catch (err) {
    console.log(`# /carts/self err :`, err)
  }
}
// [POST] /carts/addToCart
export const apiAddToCart = async (item) => {
  try {
    console.log('# carts/addToCart req :', item)
    const { data } = await nutritivApi.post(
      `/carts/addToCart`,
      item
    )
    console.log(
      '# /carts/addToCart res :',
      data
    )
    store.dispatch(updateUserCartQuantity({
      // cartQuantity: data.updatedCart.totalQuantity,
      cartQuantity: data.cart.totalQuantity,
    }))
    return (
      data
    )
  } catch (err) {
    console.log(`# /carts/addToCart err .:`)
    console.log(err)
  }
}
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
    console.log('# [delete] /carts/ err:', err)
  }
}

// ### stripe ###
// [POST] /stripe/create-checkout-session
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
    console.log('# Too many API requests :', err)
  }
  return Promise.reject(err)
})

export default nutritivApi;