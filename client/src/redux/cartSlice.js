import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        idNum: 0,
        promotion: false,
        upselling: false,
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
        discountCode: '',
        tip: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            let z = action.payload

            z.itemId = state.idNum + 1;
            state.products.push(z);
            state.idNum++;

            state.quantity += 1;
            state.subtotal += action.payload.price * action.payload.quantity;
            state.salesTax = state.subtotal * 10.25 / 100
            if (state.discount !== 0) {
                state.subtotal += state.discount
                state.salesTax = state.subtotal * 10.25 / 100;
                state.discount = 0;
                state.discountCode = '';
            }
            if (state.tip !== 0) {
                state.total -= state.tip;
                state.tip = 0;
            }
            if (state.upselling) {
                state.discount = (state.subtotal) * 15 / 100;
                state.subtotal -= state.discount;
                state.salesTax = state.subtotal * 10.25 / 100;
                state.total = state.subtotal + state.tip + state.deliveryCharges + state.salesTax;
            }
            state.total = state.subtotal + state.tip + state.deliveryCharges + state.salesTax;
            // state.total += action.payload.price * action.payload.quantity + state.tip + (action.payload.price * action.payload.quantity) * 10 / 100;
        },
        deleteProduct: (state, action) => {
            const x = state.products.find(product => product.itemId === action.payload.itemId);
            console.log(action.payload)
            state.products.splice(state.products.indexOf(x), 1);
            state.quantity -= 1;
            if (state.quantity === 0) {
                state.upselling = false;
            }
            state.subtotal -= action.payload.price * action.payload.quantity;
            state.salesTax = state.subtotal * 10.25 / 100;
            if (state.discount !== 0) {
                state.subtotal += state.discount
                state.salesTax = state.subtotal * 10.25 / 100;
                state.discount = 0;
            }
            if (state.upselling) {
                state.discount = (state.subtotal) * 15 / 100;
                state.subtotal -= state.discount;
                state.salesTax = state.subtotal * 10.25 / 100;
                state.total = state.subtotal + state.tip + state.deliveryCharges + state.salesTax;
            }
            if (state.upselling && action.payload.upsaleItem) {
                state.upselling = false;
                state.subtotal += state.discount
                state.salesTax = state.subtotal * 10.25 / 100;
                state.discount = 0;
            }
            state.total = state.subtotal + state.tip + state.deliveryCharges + state.salesTax;
            // state.total -= action.payload.price * action.payload.quantity + (action.payload.price * action.payload.quantity) * 10 / 100;
        },
        addDelivery: (state, action) => {
            state.deliveryCharges += action.payload
            state.total += state.deliveryCharges
        },
        deleteDelivery: (state, action) => {
            state.total -= state.deliveryCharges
            state.deliveryCharges -= state.deliveryCharges
        },
        addCoupon: (state, action) => {
            state.discount += state.subtotal * action.payload / 100;
            state.subtotal -= state.subtotal * action.payload / 100;
            state.salesTax = state.subtotal * 10.25 / 100;
            state.total = state.subtotal + state.tip + state.deliveryCharges + state.salesTax;
        },
        removeCoupon: (state) => {
            state.subtotal += state.discount;
            state.salesTax = state.subtotal * 10.25 / 100;
            state.discount = 0;
            state.total = state.subtotal + state.tip + state.deliveryCharges + state.salesTax;
        },
        reset: (state) => {
            state.idNum = 0;
            state.promotion = false;
            state.upselling = false;
            state.pickUporDeliver = '';
            state.shop = '';
            state.date = '';
            state.time = '';
            state.products = [];
            state.quantity = 0;
            state.salesTax = 0;
            state.subtotal = 0;
            state.total = 0;
            state.deliveryCharges = 0;
            state.discount = 0;
            state.discountCode = '';
            state.tip = 0;
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
            state.pickUporDeliver = action.payload;
        },
        removeAddPickuporDeliver: (state, action) => {
            state.pickUporDeliver = ''
        },
        addPromotion: (state, action) => {
            state.promotion = true
        },
        removePromotion: (state, action) => {
            state.promotion = false
        },
        addUpselling: (state, action) => {
            state.upselling = true;
            state.discountCode = 'upselling'
        },
        removeUpselling: (state, action) => {
            state.upselling = false;
            state.discountCode = '';
        },
        addDiscountCode: (state, action) => {
            state.discountCode = action.payload;
        },
        removeDiscountCode: (state, action) => {
            state.discountCode = '';
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
    removeAddPickuporDeliver,
    addPromotion,
    removePromotion, addUpselling, removeUpselling, addDiscountCode, removeDiscountCode
} = cartSlice.actions;
export default cartSlice.reducer;