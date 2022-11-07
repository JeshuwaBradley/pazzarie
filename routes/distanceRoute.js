const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res) => {
    // let shops = ['1706 University Ave, Berkeley, CA 94703, USA', "1600 4th Ave, Oakland, CA 94606, USA"]
    // let distance = [];
    // let address = req.body.address;
    // // let address = req.body.address + ', ' + req.body.city + ', ' + req.body.state + ', ' + req.body.zip + ', ' + req.body.country;
    // let i;
    // for (i = 0; i < shops.length; i++) {
    //     let config = {
    //         method: 'get',
    //         url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${address}&destinations=${shops[i]}&key=${process.env.DISTANCE_MATRIX_API}`,
    //         headers: {}
    //     };
    //     const res = axios(config)
    //     axios(config)
    //         .then((response) => {
    //             // res.status(200).json(response.data)
    //             distance.push(response.data.rows[0].elements[0].distance.value)
    //         })
    //         .catch((error) => {
    //             res.status(500).json(error);
    //         });
    // }
    // 
    let destination = req.body.destination;
    let address = req.body.address + ', ' + req.body.city + ', ' + req.body.state + ', ' + req.body.zip + ', ' + req.body.country
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