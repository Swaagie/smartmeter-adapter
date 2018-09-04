'use strict';

const leveldown = require('leveldown');
const levelup = require('levelup');

let db;

module.exports = function store({ location = './.db' } = {}) {
  if (db) return db;

  return db = levelup(
    leveldown(location)
  );
}
