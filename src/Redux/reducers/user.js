import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
    },
    reducers: {
        updateAuthStatus: (user, action) => {
            const { loggedIn } = action.payload;
            user.loggedIn = loggedIn;
        },
    }
})
export const { 
    updateAuthStatus,
} = userSlice.actions;

export default userSlice.reducer;