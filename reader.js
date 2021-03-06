'use strict';

const SerialPort = require('serialport');

class Reader {
  constructor({ events, port, signature = /![0-9A-F]{4}/ }) {
    const { target, options } = port;

    this._open = false;
    this._signature = signature;
    this._events = events;
    this._port = new SerialPort(target, {
      ...options,
      autoOpen: false
    });
  }

  open() {
    this._port.open(error => {
      if (error) {
        return this._events.emit('error', error);
      }

      this._open = true;
      this._port.on('data', this.concat());
    });
  }

  //
  // Concatenate all data in to a single array that can be parsed
  //
  concat(signal = []) {
    return data => {
      signal.push(data.toString('utf-8'));

      //
      // End of message, parse the concatenated signal.
      //
      if (~data.indexOf('!')) {
        this._events.emit('signal', signal.join(''));
        signal = [];
      }
    }
  }
}

module.exports = Reader;
