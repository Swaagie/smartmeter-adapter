'use strict';

const EventEmitter = require('eventemitter3')
const SerialPort = require('serialport');

class Reader {
  constructor({ events, port, signature = /\d-\d:/ }) {
    const { target, options } = port;

    this._open = false;
    this._signature = signature;
    this._events = new EventEmitter(events);
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

    return this._events;
  }

  //
  // Concatenate all data in to a single array that can be parsed
  //
  concat(signal = []) {
    return data => {
      data = data.toString('utf-8');

      //
      // Ignore transmitted data that is not useful.
      //
      if (signature.test(data)) signal.push(data);

      //
      // End of message, parse.
      //
      if (data.charAt(0) === '!') {
        this._events.emit('signal', signal);
        signal = [];
      }
    }
  }
}
