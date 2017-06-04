'use strict';

const Agent = require('./Agent');
const net = require('net');

module.exports = class Client extends Agent {
    constructor(options) {
        super(net.createConnection(options));
    }
};
