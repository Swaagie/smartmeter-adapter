'use strict';

const Reader = require('./reader');
const Parser = require('./parser');

const parser = new Parser();
const reader = new Reader({
  port: {
    target: '/dev/ttyUSB0',
    options: {
      baudRate: 115200
    }
  }
});

reader.open()
  .on('error', console.error)
  .on('signal', parser.parse.bind(parser));
