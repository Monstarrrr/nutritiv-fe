import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileNavMenu: false,
}

export const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeMobileNavMenu: (modals) => {
      modals.mobileNavMenu = false
    },
    openMobileNavMenu: (modals) => {
      modals.mobileNavMenu = true
    },
  }
})
export const {
  closeMobileNavMenu,
  openMobileNavMenu
} = modalsSlice.actions;

export default modalsSlice.reducer;
