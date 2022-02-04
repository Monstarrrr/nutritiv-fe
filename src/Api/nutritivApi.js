import axios from 'axios';
import storage from '../Helpers/localStorage';
import { updateAuthStatus } from '../Redux/reducers/user';

// API INSTANCE
const nutritivApi = axios.create({
    baseURL: 'http://localhost:3001/', // Change in prod
})

// API CALLS
export const loginUser = (loginData) => (
    nutritivApi.post('/auth/login', { loginData })
);

// INJECT STORE TO PREVENT IMPORT ISSUES
let store
export const injectStore = _store => {
  store = _store
}

// INTERCEPTORS
// on request
nutritivApi.interceptors.request.use(req => {
    const refreshToken = localStorage.getItem(storage.accessToken);
    const accessToken = localStorage.getItem(storage.refreshToken);
    req.headers.access_token = accessToken;
    req.headers.refresh_token = refreshToken;
    console.log('# API req :', req)
    return req;
}, function (err) {
    return Promise.reject(err)
})
// on response
nutritivApi.interceptors.response.use(res => {
    if(res.headers.access_token || res.headers.refresh_token) {
        localStorage.setItem(
            storage.accessToken,
            res.headers.access_token
        )
        localStorage.setItem(
            storage.refreshToken, 
            res.headers.refresh_token
        )
    }
    store.dispatch(updateAuthStatus({
        loggedIn: res.data.loggedIn,
    }))
    console.log("# API res :", res);
    return res;
}, function (err) {
    return Promise.reject(err)
})

export default nutritivApi;