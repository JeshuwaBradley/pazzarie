import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        pickUporDeliver: '',
        shop: '',
        date: '',
        time: '',
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
            state.discount += state.subtotal * action.payload / 100;
            state.subtotal -= state.subtotal * action.payload / 100;
            state.salesTax = state.subtotal * action.payload / 100;
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
            state.tip = action.payload;
            state.total += state.tip;
        },
        removeTip: (state, action) => {
            state.total -= state.tip;
            state.tip = 0;
        },
        addShop: (state, action) => {
            state.shop = action.payload;
        },
        removeShop: (state, action) => {
            state.shop = '';
        },
        addDate: (state, action) => {
            state.date = action.payload;
        },
        removeDate: (state, action) => {
            state.date = '';
        },
        addTime: (state, action) => {
            state.time = action.payload;
        },
        removeTime: (state, action) => {
            state.time = '';
        },
        addPickUporDeliver: (state, action) => {
            state.pickUporDeliver = '';
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
    removeTip,
    addShop,
    removeShop,
    addTime,
    removeTime,
    addDate,
    removeDate,
    addPickUporDeliver,
} = cartSlice.actions;
export default cartSlice.reducer;