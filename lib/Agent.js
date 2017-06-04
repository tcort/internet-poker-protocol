'use strict';

const EventEmitter = require('events').EventEmitter;
const Message = require('./Message');
const byline = require('byline');
const net = require('net');

module.exports = class Agent extends EventEmitter {

    constructor(socket) {
        super();

        this.socket = socket;

        // proxy most socket events
        [ 'close', 'connect', 'drain', 'end', 'error', 'lookup', 'timeout' ].forEach((event) => {
            this.socket.on(event, () => this.emit.apply(this, arguments));
        });

        // get messages line by line
        this.socket.once('connect', () => {
            byline.createStream(this.socket).on('data', (line) => {
                try {
                    this.emit('data', Message.parse(line.toString()));
                } catch (err) {
                    this.emit('error', err);
                }
            });
        });
    }

    destroy() {
        this.socket.destroy.apply(this.socket, arguments);
    }

    end() {
        this.socket.end();
    }

    pause() {
        this.socket.pause.apply(this.socket, arguments);
    }

    ref() {
        this.socket.ref.apply(this.socket, arguments);
    }

    resume() {
        this.socket.resume.apply(this.socket, arguments);
    }

    unref() {
        this.socket.unref.apply(this.socket, arguments);
    }

    write(message) {
        this.socket.write(Message.stringify(message));
    }
};
