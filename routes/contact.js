const router = require('express').Router();
const nodemailer = require("nodemailer");

router.post('/', async (req, res) => {
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
    const mail = {
        from: req.body.name,
        to: process.env.EMAIL,
        subject: req.body.name,
        text: `${req.body.city}, ${req.body.name}, ${req.body.email}, ${req.body.number}, ${req.body.message}`
    }
    await transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong.");
        } else {
            res.status(200).send("Email successfully sent to recipient!");
        }
    });
})


module.exports = router;
