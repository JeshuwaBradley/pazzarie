const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    coupon: {
        type: String,
        required: true,
        unique: true,
    }
}
)

module.exports = mongoose.model("Email", EmailSchema);