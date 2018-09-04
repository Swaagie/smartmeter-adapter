'use strict';

const EventEmitter = require('eventemitter3');
const Reader = require('./reader');
const Parser = require('./parser');
const store = require('./store');

const events = new EventEmitter();
const parser = new Parser(events);
const reader = new Reader({
  events,
  port: {
    target: '/dev/ttyUSB0',
    options: {
      baudRate: 115200
    }
  }
});

events
  .on('error', console.error)
  .on('signal', parser.parse.bind(parser));
  .on('store', function receivedData(key, data) {
    store.put(key, data, error => this.emit('error', error));
  });

reader.open();
