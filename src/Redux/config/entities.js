import { combineReducers } from "redux";
import productsSlice from "../reducers/products";
import userSlice from '../reducers/user';

export default combineReducers({
    products: productsSlice,
    user: userSlice,
})