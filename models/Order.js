const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
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
            type: Number,
        },
        total: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);