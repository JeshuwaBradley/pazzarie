const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const cors = require("cors");
const path = require("path")


const app = express();
dotenv.config();

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
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api/order', orderRoute);
app.use('/api/product', productRoute);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// comment 

app.listen(port, () => {
    console.log(`Server started listening`);
});