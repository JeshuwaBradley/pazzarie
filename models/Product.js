const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        itemTitle: {
            type: String,
            required: true,
            maxlength: 60,
        },
        itemDesc: {
            type: String,
            maxlength: 200,
        },
        itemCategory: {
            type: String,
            required: true,
        },
        imgSrc: {
            type: String,
            required: true,
        },
        itemPrices: {
            type: [
                {
                    text: { type: String },
                    price: { type: Number },
                },
            ],
            required: true,
        },
        extraOptions: {
            type: [
                {
                    text: { type: String },
                    price: { type: Number },
                },
            ],
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Product", ProductSchema);