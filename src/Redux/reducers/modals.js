import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarMenu: false,
}

export const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeNavbarMenu: (modals) => {
      modals.navbarMenu = false
    },
    openNavbarMenu: (modals) => {
      modals.navbarMenu = true
    },
  }
})
export const {
  closeNavbarMenu,
  openNavbarMenu
} = modalsSlice.actions;

export default modalsSlice.reducer;
