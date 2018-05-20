"use strict";

const EventEmitter2 = require('eventemitter2');

const bus = new EventEmitter2({
  wildcard:true,
});

module.exports = bus;