const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//Login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).json('Wrong credentials');
        } else {
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);
            const OriginalPass = hashedPassword.toString(CryptoJS.enc.Utf8);
            if (OriginalPass !== req.body.password) {
                res.status(401).json('Wrong credentials');
            } else {
                res.status(200).json(user)
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Register

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC),
        isAdmin: req.body.isAdmin,
        isShop: req.body.isShop,
        shopNo: req.body.shopNo,
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;