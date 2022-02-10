const Order = require('../models/Order');

const router = require("express").Router();

//create 


router.post('/', async (req, res) => {
    const newOrder = new Order(req.body);
    console.log(newOrder);
    try {
        const saved = await newOrder.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all orders

router.get('/find', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete orders

//update orders


module.exports = router;