const mongoose = require('mongoose');

const DiscountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("DiscountCode", DiscountCodeSchema);