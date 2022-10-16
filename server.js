
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
const cors = require("cors");
const path = require("path")


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

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
app.get('*', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https')
        res.redirect('https://novaspizza.com' + req.url)
    else
        next() /* Continue to other routes if we're not redirecting */
})

// comment 

app.listen(port, () => {
    console.log(`Server started listening ${port}`);
});