'use strict';

const IPP = require('../');

const client = new IPP.Client({ host: 'localhost', port: 9898 });

// protocol logger
client.on('ipp', function (socket, direction, message) {
    console.log(`${socket.address().address}:${socket.address().port} ${direction === 'send' ? '<' : '>'} [${message}]`);
});


client.on('data', (message) => {
    switch (message.command) {
        case 'IPP':
            client.write({
                command: 'BUYIN',
                name: 'Jane',
                amt: 100
            });
            break;
    }
});
