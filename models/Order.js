const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        shop: {
            type: Number,
            required: true,
        },
        customer: {
            type: String,
            required: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            maxlength: 100,
        },
        mobile: {
            type: String,
            required: true,
            maxlength: 100,
        },
        orderItems: {
            type: [
                {
                    itemName: {
                        type: String,
                        required: true,
                        maxlength: 60,
                    },
                    extras: {
                        type: [
                            {
                                type: String,
                                maxlength: 60,
                            }
                        ],
                    },
                    size: {
                        type: String,
                        required: true,
                        maxlength: 60,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                    itemPrice: {
                        type: Number,
                        required: true,
                    },
                    itemTotal: {
                        type: Number,
                        required: true,
                    }
                }
            ],
            required: true,
        },
        promote: {
            type: Boolean,
            required: false,
        },
        deliver: {
            type: Boolean,
            required: true,
        },
        address: {
            type: String,
            maxlength: 200,
        },
        city: {
            type: String,
            maxlength: 60,
        },
        state: {
            type: String,
            maxlength: 60,
        },
        zip: {
            type: String,
            maxlength: 60,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);