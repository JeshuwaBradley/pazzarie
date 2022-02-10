const Product = require('../models/Product');

const router = require('express').Router();

//create 


router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    try {
        const saved = await newProduct.save();
        res.status(200).json(saved)
        console.log(saved);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all products

router.get('/find', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        console.log(products);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
})

//Delete product


//update product


module.exports = router;