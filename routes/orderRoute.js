const Order = require('../models/Order');
const router = require("express").Router();
const nodemailer = require("nodemailer")
// const hbs = require('nodemailer-express-handlebars');
// const path = require('path')

//create 

const sendMail = async (data) => {
  console.log(data)
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
  const getExtras = (item) => {
    let extras = '';
    item['extras'].map((extra) => {
      extras += `${extra}, `
    })
    return extras;
  }

  let substring = '';
  data['orderItems'].map((item) => {
    substring += `Order Item:\n Item Title: ${item['itemName']}\n Item Size: ${item['size']}\n Item Crust: ${item['crust']}\n Extras: ${getExtras(item)}\n Item Quantity: ${item['quantity']}\n\n`
  })

  const getEmail = () => {
    const shops = ['novaspizza.promo@gmail.com', 'jonathanbraxton18@gmail.com',]
    return shops[data['shop'] - 1]
  }

  let mail = {
    from: 'jeshuwabradley@gmail.com',
    to: getEmail(),
    subject: 'Test Email One',
    text: `Customer Name: ${data['customer']}\n Customer Mobile: ${data['mobile']}\n Customer Email: ${data['email']}\n Pickup or Deliver: ${data['deliver']}\n ${data['deliver'] === 'deliver' ? `Customer Address: ${data['address']}, ${data['city']}, ${data['state']}, ${data['zip']}\n` : ''} Quantity: ${data['orderItems'].length}\n\n ${substring}\n Notes for the kitchen: ${data['notes']}\n Tip: ${data['tip']}\n Discount: ${data['discount']}\n Total: ${data['total']}\n `,
  }
  console.log(mail)
  await transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(`sent email to ${mail['to']}`)
      res.status(200).send(`sent email to ${mail['to']}`);
    }
  });
}

router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saved = await newOrder.save();
    res.status(200).json(saved);
    sendMail(req.body)
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


//update order status

router.put("/status/:id", async (req, res) => {
  let orderId = req.params.id;
  let updates = req.body
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates)
    res.status(200).json(`Order ${req.params.id} has been updated...`)
  } catch (error) {
    res.status(500).json(error)
  }
})

//find orders according to shop

router.get("/find-shop/:id", async (req, res) => {
  let query = { shop: req.params.id }
  try {
    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(20)
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(error.response.status).json(error)
  }
})


//delete orders

router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  try {
    const deletedOrder = await Order.findByIdAndDelete(id)
    res.status(200).json(deletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get emails of all the orders

router.get('/emails', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router;