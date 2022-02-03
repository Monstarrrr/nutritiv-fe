import axios from 'axios';
import store from '../Redux/config/store'
import { updateAuthStatus } from '../Redux/reducers/user';

const nutritivApi = axios.create({
    baseURL: 'http://localhost:3001/', // Change in prod
})

// REGENERATE TOKENS || DISCONNECT //
nutritivApi.interceptors.request.use(req => {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');
    req.headers.access_token = accessToken;
    req.headers.refresh_token = refreshToken;
    console.log('# API req :', req)
    return req;
}, function (err) {
    return Promise.reject(err)
})
nutritivApi.interceptors.response.use(res => {
    if(res.headers.access_token || res.headers.refresh_token) {
        localStorage.setItem('refresh_token', res.headers.refresh_token)
        localStorage.setItem('access_token', res.headers.access_token)
    }
    console.log("# API res :", res);
    return res;
}, function (err) {
    return Promise.reject(err)
})

export default nutritivApi;