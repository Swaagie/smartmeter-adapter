'use strict';

const usb = require('usb');
const devices = usb.getDeviceList();

const result = devices[0].open();

console.log(result);
