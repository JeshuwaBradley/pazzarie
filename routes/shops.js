const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({
        shops: [
            {
                location: 'Berkeley',
                address: '1706 University Ave, Berkeley, CA 94703, USA',
                pickUp: true,
                deliver: true,
                distance: 5637.7,
                email: '1706university@gmail.com',
                open: true
            },
            {
                location: 'Oakland',
                address: '1438 Broadway, Oakland, CA 94612, USA',
                pickUp: false,
                deliver: true,
                distance: 9656.06,
                email: 'hs211094@gmail.com',
                open: true
            }
        ]
    })
})

module.exports = router;