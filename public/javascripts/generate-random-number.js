const cryptoRandomString = require('crypto-random-string');
const randomInt = require('rnum');
// import { rNumber, rNumChar } from 'genrandom';
// const rNum = require('genrandom');
// import { rNumber, rNumChar } from 'genrandom';
const randNbr = require('js-random-number');
const rNum = require('genrandom')
const randomize = require('randomatic'); // with special chars

exports.sayHi = sayHello;
exports.createCryptoString = createCryptoString;
exports.createRandomInt = createRandomInt;
exports.createRandomNumber = createRandomNumber;
exports.createRandomNumberMultiple = createRandomNumberMultiple;
exports.createRandomAlphaSpecialChars = createRandomAlphaSpecialChars;


function createRandomInt(length) {
  // return randomInt(length);
  // return randNbr.getNumber();
  // console.log(rNum.rChar(100))
  console.log(rNum.rNumber(128))
  // console.log(rNum.rNumChar(100))
  // console.log(rNum.rNumCharSymbol(100))
  return 1;
}

function createRandomNumber(length) {
  let config = new randNbr.Configuration();
  config.setLength(16)
  let r = new randNbr.Generator(config);
  let rn = r.getNumber();
  console.log(r);
  return rn.getValue();
}

// TODO: make ALL FUNCTIONS use this library
function createRandomAlphaSpecialChars(length) {
  // randomize('*', 10); //=> 'x2_^-5_T[$'
  // randomize('Aa0!', 10); //=> 'LV3u~BSGhw'  
  return randomize('*', length);
}

function createRandomNumberMultiple(length) {
  let config = new randNbr.Configuration();
  config.setLength(length);
  let arr = [];
  let result = '';
  if (length <= 16) {
    result = new randNbr.Generator(config).getNumber().getValue().toString();
  } else {
    for (let i = 0; i < (length / 16); i++) {
      arr.push(new randNbr.Generator(config).getNumber().getValue().toString());
    }
    result = arr.join('');
  }
  return result;
}

function createCryptoString(length) {
  return cryptoRandomString(length);
}

function sayHello() {
  return 'Hello from Random Number JS file ...';
}
