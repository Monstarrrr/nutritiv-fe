import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        username: "",
        email: "",
        isAdmin: false,
        isVerified: false,
        cart: [],
    },
    reducers: {
        updateAuthStatus: (user, action) => {
            const { loggedIn } = action.payload;
            user.loggedIn = loggedIn;
        },
        updateUser: (user, action) => {
            const { 
                loggedIn, 
                username, 
                email, 
                isAdmin, 
                isVerified,
            } = action.payload;
            user.loggedIn = loggedIn;
            user.username = username;
            user.email = email;
            user.isAdmin = isAdmin;
            user.isVerified = isVerified;
        },
        updateUserCart: (user, action) => {
            // const { ??? } = action.payload;
            // user.cart = ???;
        }
    }
})
export const {
    updateUser,
    updateUserCart,
    updateAuthStatus,
} = userSlice.actions;

// Selector

export default userSlice.reducer;
