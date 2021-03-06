import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        salesTax: 0,
        subtotal: 0,
        total: 0,
        deliveryCharges: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.salesTax += action.payload.price * 10 / 100
            state.subtotal += action.payload.price * action.payload.quantity
            state.total += action.payload.price * action.payload.quantity + action.payload.price * 10 / 100;
        },
        deleteProduct: (state, action) => {
            const x = state.products.find(product => product._id === action.payload._id)
            state.products.splice(state.products.indexOf(x), 1);
            state.quantity -= 1;
            state.salesTax -= action.payload.price * 10 / 100
            state.subtotal -= action.payload.price * action.payload.quantity;
            state.total -= action.payload.price * action.payload.quantity + action.payload.price * 10 / 100;
        },
        addDelivery: (state, action) => {
            state.total += action.payload
        },
        deleteDelivery: (state, action) => {
            state.total -= action.payload
        },
        reset: (state) => {
            state.products = [];
            state.quantity = 0;
            state.salesTax = 0;
            state.subtotal = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, deleteProduct, addDelivery, deleteDelivery, reset } = cartSlice.actions;
export default cartSlice.reducer;