const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res) => {
    let destination = '1915 San Pablo Ave, Oakland, CA 94612, United States'
    let address = req.body.address + ', ' + req.body.city + ', ' + req.body.state + ', ' + req.body.zip + ', ' + req.body.country
    console.log(address)
    let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${address}&destinations=${destination}&key=${process.env.DISTANCE_MATRIX_API}`,
        headers: {}
    };

    axios(config)
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((error) => {
            res.status(500).json(error);
        });
})

module.exports = router