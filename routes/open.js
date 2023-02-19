const router = require('express').Router();

let open = true;

router.get('/', (req, res) => {
    res.send({
        open: open,
        days: [
            {
                sunday: {
                    open: true,
                    openTime: 16,
                    closeTime: 1
                }
            },
            {
                monday: {
                    open: false,
                    openTime: 16,
                    closeTime: 1,
                }
            },
            {
                tuesday: {
                    open: true,
                    openTime: 16,
                    closeTime: 1,
                }
            },
            {
                wednesday: {
                    open: true,
                    openTime: 16,
                    closeTime: 1,
                }
            },
            {
                thursday: {
                    open: true,
                    openTime: 16,
                    closeTime: 1,
                }
            },
            {
                friday: {
                    open: true,
                    openTime: 11,
                    closeTime: 1,
                }
            },
            {
                saturday: {
                    open: true,
                    openTime: 11,
                    closeTime: 1,
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