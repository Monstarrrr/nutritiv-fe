import { updateAuthStatus } from "../Redux/reducers/user"
import { storageKeys } from "./localStorage";

export const logout = dispatch => {
    localStorage.removeItem(storageKeys.accessToken)
    localStorage.removeItem(storageKeys.refreshToken)
    dispatch(updateAuthStatus({ loggedIn: false }))
}