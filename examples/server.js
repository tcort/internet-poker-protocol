'use strict';

const _ = require('lodash');
const Server = require('../lib/Server');

const server = new Server({}, (client) => {
    console.log(`${client.address().address}:${client.address().port} CONNECT`);

    client.on('end', () => {
        console.log(`${client.address().address}:${client.address().port} DISCONNECT`);
    });

    client.on('error', (err) => {
        console.log(client.uuid, 'ERROR', err);
    });

    client.on('data', (data) => {
        // do nothing for now
    });

    client.on('ipp', function (socket, direction, message) {
        console.log(`${socket.address().address}:${socket.address().port} ${direction === 'send' ? '<' : '>'} [${message}]`);
    });

    client.write({ command: 'IPP', version: '2.0.0', info: 'send BUYIN to join the game' });
});

server.on('error', (err) => {
    throw err;
});

server.listen(9898, () => {
    console.log(`${server.address().address}:${server.address().port} LISTENING`);
});
