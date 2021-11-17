const express = require('express');
const calls = require('../components/calls/network');
const filt = require('../components/filt/network');
const routes = function (server) {
    server.use('/calls', calls);
    server.use('/filt', filt);
    
}

module.exports = routes;