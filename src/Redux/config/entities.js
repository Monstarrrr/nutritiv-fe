import { combineReducers } from "redux";
import productsSlice from "../reducers/products";
import usersSlice from '../reducers/user';

export default combineReducers({
    products: productsSlice,
    users: usersSlice,
})