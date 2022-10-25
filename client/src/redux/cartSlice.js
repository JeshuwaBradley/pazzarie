import { createSlice } from '@reduxjs/toolkit';
import { startTransition } from 'react';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        salesTax: 0,
        deliveryCharges: 0,
        subtotal: 0,
        total: 0,
        discount: 0,
        tip: 0,
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
            state.deliveryCharges += action.payload
        },
        deleteDelivery: (state, action) => {
            state.total -= state.deliveryCharges
            state.deliveryCharges -= state.deliveryCharges
        },
        addCoupon: (state, action) => {
            state.discount += state.subtotal * 10 / 100;
            state.subtotal -= state.subtotal * 10 / 100;
            state.salesTax = state.subtotal * 10 / 100;
            state.total = state.subtotal + state.deliveryCharges + state.salesTax
        },
        removeCoupon: (state) => {
            state.subtotal += state.discount;
            state.discount = 0;
        },
        reset: (state) => {
            state.products = [];
            state.quantity = 0;
            state.salesTax = 0;
            state.subtotal = 0;
            state.total = 0;
        },
        addTip: (state, action) => {
            state.tip += action.payload;
            state.total += action.payload;
        },
        removeTip: (state, action) => {
            state.tip -= action.payload;
            state.total -= action.payload;
        }
    },
});

export const {
    addProduct,
    deleteProduct,
    addDelivery,
    deleteDelivery,
    reset,
    addCoupon,
    removeCoupon,
    addTip,
    removeTip
} = cartSlice.actions;
export default cartSlice.reducer;