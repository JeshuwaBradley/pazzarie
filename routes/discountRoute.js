const router = require('express').Router();
const DiscountCode = require('../models/Code');

const createCode = () => {
    let code = "NP"
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 4; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return code;
}

router.get('/find', async (req, res) => {
    try {
        const discountCodes = await (await DiscountCode.find());
        res.status(200).json(discountCodes);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    const code = createCode();
    const percent = req.body;
    const newCode = new DiscountCode({ code: code, ...percent })
    console.log(newCode);
    try {
        const saved = await newCode.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;