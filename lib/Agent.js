'use strict';

const Message = require('./Message');
const EventEmitter = require('events').EventEmitter;
const byline = require('byline');
const net = require('net');
const uuid = require('uuid');

module.exports = class Agent extends EventEmitter {

    constructor(socket) {
        super();

        this.uuid = uuid.v1();
        this.socket = socket;

        // proxy most socket events
        [ 'close', 'connect', 'drain', 'end', 'error', 'lookup', 'timeout' ].forEach((event) => {
            this.socket.on(event, () => this.emit.apply(this, arguments));
        });

        const readerSetup = () => {
            byline.createStream(this.socket).on('data', (line) => {
                this.emit('ipp', this.socket, 'recv', line.toString());
                let data;
                try {
                    data = Message.parse(line.toString().trim());
                    this.emit('data', data);
                } catch (err) {
                    this.emit('error', err);
                }
            });
        };

        if (this.socket.readable === true) {
            readerSetup();
        } else {
            this.socket.on('readable', () => {
                readerSetup();
            });
        }
    }

    address() {
        return this.socket.address.apply(this.socket, arguments);
    }

    destroy() {
        return this.socket.destroy.apply(this.socket, arguments);
    }

    end() {
        return this.socket.end.apply(this.socket, arguments);
    }

    pause() {
        return this.socket.pause.apply(this.socket, arguments);
    }

    ref() {
        return this.socket.ref.apply(this.socket, arguments);
    }

    resume() {
        return this.socket.resume.apply(this.socket, arguments);
    }

    unref() {
        return this.socket.unref.apply(this.socket, arguments);
    }

    write(message) {
        message = ('' + (typeof message === "string" ? message : Message.stringify(message))).trim();
        this.emit('ipp', this.socket, 'send', message);
        return this.socket.write.apply(this.socket, [ `${message}\n` ]);
    }

};
