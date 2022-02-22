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

//get one order

router.get("/find/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find orders according to shop

router.get("/find-shop/:id", async (req, res) => {
    let query = { shop: req.params.id }
    try {
        const orders = await Order.find(query)
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(error.response.status).json(error)
    }
})


//delete orders

router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(`Order ${req.params.id} has been deleted...`)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update orders


module.exports = router;