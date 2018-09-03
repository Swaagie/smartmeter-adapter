const store = require('./store');

class Parser {
  constructor({ db } = {}) {
    this._store = store(db);
  }

  parse(signal) {
    console.log(signal);
  }
}

module.exports = Parser;
