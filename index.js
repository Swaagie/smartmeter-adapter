'use strict';

const Reader = require('./reader');
const reader = new Reader({
  port: {
    target: '/dev/ttyUSB0',
    options: {
      baudRate: 115200
    }
  }
});

reader.open()
  .on('error', console.log)
  .on('signal', console.log);
