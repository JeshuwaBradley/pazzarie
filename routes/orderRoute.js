const Order = require('../models/Order');
const nodemailer = require("nodemailer");


const router = require("express").Router();

//create 

router.post('/', async (req, res) => {
    const deliver = async () => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", //replace with your email provider
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        const orderItems = req.body.orderItems.map((order, i) => {
            return (
                `Order Item No ${i + 1}\n
            Item Name: ${order.itemName}\n
            Item Extras: ${order.extras.map((extra) => {
                    return `${extra},`
                })}\n
            Item Size: ${order.size}\n
            Quantity: ${order.quantity}\n`
            )
        })

        const message = `
            Customer Name: ${req.body.customer}\n
            Customer Mobile: ${req.body.mobile}\n
            Deliver to customer: ${req.body.deliver}\n
            ${req.body.deliver = 'true' ? `Delivery Location: ${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.zip}, ${req.body.country}\n` : ``}
            Ordered Items:\n ${orderItems}
            `

        const mail = {
            from: req.body.customer,
            to: process.env.EMAIL,
            subject: "Nova's Pizza Order",
            text: message,
        }
        await transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("Email successfully sent to recipient!");
                console.log("Email successfully sent to recipient!")

            }

        });

    }
    const newOrder = new Order(req.body);
    try {
        const saved = await newOrder.save();
        deliver()
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all orders

router.get('/find', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
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
        const orders = await Order.find(query).sort({ createdAt: -1 })
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