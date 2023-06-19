const router = require('express').Router();

let open = true;

router.get('/', (req, res) => {
    res.send({
        open: open,
        days: [
            {
                sunday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4
                }
            },
            {
                monday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4,
                }
            },
            {
                tuesday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4,
                }
            },
            {
                wednesday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4,
                }
            },
            {
                thursday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4,
                }
            },
            {
                friday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4,
                }
            },
            {
                saturday: {
                    open: true,
                    openTime: 17,
                    closeTime: 4,
                }
            },
        ]
    })
})

router.post('/close', (req, res) => {
    open = req.body['value'];
    res.send({ open: open })
})

module.exports = router;