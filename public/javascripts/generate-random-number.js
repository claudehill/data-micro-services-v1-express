const cryptoRandomString = require('crypto-random-string');
const randomInt = require('rnum');


exports.sayHi = sayHello;
exports.createCryptoString = createCryptoString;
exports.createRandomInt = createRandomInt;


function createRandomInt(length) {
  return randomInt(length);
}

function createCryptoString(length) {
  return cryptoRandomString(length);
}

function sayHello() {
  return 'Hello from Random Number JS file ...';
}
