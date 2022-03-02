const Product = require('../models/Product');

const router = require('express').Router();

//create 


router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    try {
        const saved = await newProduct.save();
        res.status(200).json(saved)
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all products

router.get('/find', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Delete all products

router.delete('/delete', async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json("All items has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete product

router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Item has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})


//update product

router.put('/update/:id', async (req, res) => {
    try {
        const updatedProduct = Product.findByIdAndUpdate({ _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;