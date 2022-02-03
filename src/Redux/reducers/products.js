import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        addCustomer: (products, action) => {
            products.push(action.payload)
        },
        removeCustomer: (products, action) => {
            products.splice(action.payload, 1)
        },
    }
})
export const { 
    addCustomer,
    removeCustomer
} = productsSlice.actions;

export default productsSlice.reducer;