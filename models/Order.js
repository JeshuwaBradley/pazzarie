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
            maxlength: 100,
        },
        mobile: {
            type: String,
            maxlength: 100,
        },
        orderItems: {
            type: [
                {
                    itemName: {
                        type: String,
                        required: true,
                        // maxlength: 60,
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
                        maxlength: 60,
                    },
                    crust: {
                        type: String,
                        maxlength: 60,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                    specialNotes: {
                        type: String,
                        maxlength: 200,
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
        preOrderDate: {
            type: String,
            maxlength: 200,
        },
        preOrderTime: {
            type: String,
            maxlength: 200,
        },
        deliver: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            maxlength: 200,
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
        tip: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        discountCode: {
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