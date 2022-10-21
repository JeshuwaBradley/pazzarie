const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
    let amount = Math.round(req.body.amount * 100) / 100
    console.log(amount)
    await stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;