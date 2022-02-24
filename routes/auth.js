const router = require('express').Router();
const User = require('../models/User');

//Login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json('Wrong credentials');
        const password = user.password;
        password !== req.body.password && res.status(401).json('Wrong credentials');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Register

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.admin,
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;