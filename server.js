
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const authRoute = require("./routes/auth")
const stripeRoute = require("./routes/stripe");
const contactRoute = require("./routes/contact");
const distanceRoute = require("./routes/distanceRoute");
const emailRoute = require('./routes/emailRoute');
const openRoute = require('./routes/open');
const discountRoute = require('./routes/discountRoute');
const recieptRoute = require('./routes/recieptRoute');
const preorderRoute = require('./routes/preorder')
const shopsRoute = require('./routes/shops')
const cors = require("cors");
const path = require("path");


const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
)
    .then(() => console.log('DB connection successfull!'))
    .catch((err) => {
        console.log(err)
    });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))
app.use('/api/order', orderRoute);
app.use('/api/product', productRoute);
app.use('/api/auth', authRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/contact", contactRoute);
app.use("/api/distance", distanceRoute)
app.use("/api/email", emailRoute);
app.use('/api/open', openRoute);
app.use('/api/discount', discountRoute);
app.use('/api/receipt', recieptRoute);
app.use('/api/preorder', preorderRoute);
app.use('/api/shops', shopsRoute)

// app.get('/api/open', console.log(openRoute))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// comment 

app.listen(port, () => {
    console.log(`Server started listening ${port}`);
});