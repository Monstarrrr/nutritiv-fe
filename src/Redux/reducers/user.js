import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    username: "",
    email: "",
    isAdmin: false,
    isVerified: false,
    cartQuantity: 0,
    addresses: [],
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
        addresses,
      } = action.payload;
      user.loggedIn = loggedIn;
      user.username = username;
      user.email = email;
      user.isAdmin = isAdmin;
      user.isVerified = isVerified;
      user.addresses = addresses;
    },
    updateUserCartQuantity: (user, action) => {
      const { cartQuantity } = action.payload;
      user.cartQuantity = cartQuantity;
    },
    updateUserAddresses: (user, action) => {
      const { addresses } = action.payload;
      user.addresses = addresses;
    },
    deleteUserAddress: (user, action) => {
      const { addressId } = action.payload;
      return user.addresses.filter(
        address => address._id !== addressId
      )
    },
  }
})
export const {
  updateUser,
  updateUserCartQuantity,
  updateAuthStatus,
  updateUserAddresses,
  deleteUserAddress,
} = userSlice.actions;

// Selector

export default userSlice.reducer;
