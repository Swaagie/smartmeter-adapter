'use strict';

class Parser {
  constructor({ events, identifier = /\d-\d:/ } = {}) {
    this._events = events;
    this._identifier = identifier;
  }

  extract(signal, n) {
    const unit = signal[n];

    if (!unit) return;
    return parseFloat(unit.substring(unit.lastIndexOf('(') + 1, unit.lastIndexOf(')')));
  }

  parse(signal) {
    signal = signal.split('\r\n').filter(d => this._identifier.test(d)).map(d => d.trim());

    this._events.emit('store', Date.now(), {
      lowTariffReceived: this.extract(signal, 3),
      highTariffReceived: this.extract(signal, 4),
      lowTariffDelivered: this.extract(signal, 5),
      highTariffDelivered: this.extract(signal, 6),
      consumption: this.extract(signal, 8),
      production: this.extract(signal, 9),
      gasConsumption: this.extract(signal, 32)
    });
  }
}

module.exports = Parser;
