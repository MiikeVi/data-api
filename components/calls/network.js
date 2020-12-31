const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function(req, res) {
    //const filterCalls = req.query || null;
    res.header({
        "Access-Control-Allow-Origin" : "http://localhost:4200",
    });
    controller.getCalls()
        .then((callsList) => {
            response.success(req, res, callsList, 200);
            
        })
        .catch(e => {
            response.error(req, res, 'unexpected error', 500, e)
        })

});

module.exports = router;