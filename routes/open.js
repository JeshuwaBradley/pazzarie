const router = require('express').Router();

let open = true;

router.get('/', (req, res) => {
    res.send({ open: open })
})

router.post('/close', (req, res) => {
    open = req.body['value'];
    res.send({ open: open })
})

module.exports = router;