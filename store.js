const leveldown = require('leveldown');
const levelup = require('levelup');

let db;

module.exports = function store({ location = './mydb' } = {}) {
  if (db) return db;

  db = levelup(
    leveldown(location)
  );
}
