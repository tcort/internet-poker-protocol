'use strict';

const IPP = require('../');

const client = new IPP.Client({ host: 'localhost', port: 9898 });
client.on('data', console.log);
