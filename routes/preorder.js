const router = require('express').Router();
const nodemailer = require("nodemailer");

router.post('/', async (req, res) => {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", //replace with your email provider
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
    let string = '';
    req.body.selectedItems.map((item) => string += `${item}, `)
    const mail = {
        from: req.body.name,
        to: 'jeshuwabradley@gmail.com',
        subject: "Nova's Pizza - Pre Order",
        text: `Customer Name: ${req.body.name},\n Customer Email: ${req.body.email},\n Customer Mobile: ${req.body.mobile},\n Date & Time: ${req.body.dateTime},\n Items: ${string}, \n Additional Notes: ${req.body?.additionalNotes}`
    }
    await transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send("Email successfully sent to recipient!");
        }
    });
})


module.exports = router;
