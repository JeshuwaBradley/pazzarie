const Email = require("../models/Email")

const router = require("express").Router();


const createCode = () => {
    let code = "NP"
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 4; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return code;
}

// post new email 


router.post('/', async (req, res) => {
    const email = req.body;
    const coupon = createCode();
    const newEmail = new Email({ ...email, coupon: coupon })
    console.log(email)
    try {
        const saved = await newEmail.save()
        res.status(200).json(saved)
    } catch (error) {
        console.log(error)
    }
})

// get all promotion emails

router.get('/find', async (req, res) => {
    try {
        let emmails = [];
        const emails = await Email.find();
        emails.forEach((email) => emmails.push(email['email']))
        res.status(200).json(emails)
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete promotion email

router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id
    try {
        const deletedEmail = await Email.findByIdAndDelete(id)
        res.status(200).json(`Email has been deleted ${deletedEmail}`)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;