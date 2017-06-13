'use strict';

const Agent = require('./Agent');
const EventEmitter = require('events').EventEmitter;
const net = require('net');

module.exports = class Server extends EventEmitter {

    constructor(options, connectionListener) {
        super();

        if (typeof options === "function") {
            connectionListener = options;
            options = {};
        }

        this.server = net.createServer(options, (client) => {
            this.emit('connection', new Agent(client));
        });

        // proxy most socket events
        [ 'close', 'error', 'listening' ].forEach((event) => {
            this.server.on(event, () => this.emit.apply(this, arguments));
        });

        if (typeof connectionListener === "function") {
            this.on('connection', connectionListener);
        }
    }

    address() {
        return this.server.address.apply(this.server, arguments);
    }

    close() {
        return this.server.close.apply(this.server, arguments);
    }

    listen() {
        return this.server.listen.apply(this.server, arguments);
    }

    get listening() {
        return this.server.listening;
    }

    get maxConnections() {
        return this.server.maxConnections;
    }

    ref() {
        return this.server.ref.apply(this.server, arguments);
    }

    unref() {
        return this.server.unref.apply(this.server, arguments);
    }
};
