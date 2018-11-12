const cryptoRandomString = require('crypto-random-string'); // -- KEEP
// const randNbr = require('js-random-number');
const rNum = require('genrandom') // -- KEEP allows segmented & special chars
const rFloat = require('random-float');
const randomatic = require('randomatic'); // -- KEEP with special chars

exports.sayHi = sayHello;
exports.createCryptoString = createCryptoString;
exports.createRandomInt = createRandomInt;
exports.createRandomNumber = createRandomNumber;
exports.createRandomNumberMultiple = createRandomNumberMultiple;
exports.createRandomAlphaSpecialChars = createRandomAlphaSpecialChars;
exports.getSessionKey = getSessionKey;


function createRandomInt(length) {
  // return randomInt(length);
  // console.log(rNum.rChar(100))
  console.log('rNum.rNumber(24) .... ', rNum.rNumber(24))
  // console.log(rNum.rNumChar(100))
  // console.log(rNum.rNumCharSymbol(100))
  console.log('randomatic(0, 48)', randomatic('0', 48))
  return randomatic('0', 48);
}

function createRandomNumber(length) {
  // let config = new randNbr.Configuration();
  // config.setLength(16)
  // let r = new randNbr.Generator(config);
  // let rn = r.getNumber();
  // console.log(r);
  // return rn.getValue();
  return rNum.rNumber(16);
}

// TODO: make ALL FUNCTIONS use this library?
function createRandomAlphaSpecialChars(length) {
  // randomatic NPM package

  // randomatic('*', 10); //=> 'x2_^-5_T[$'
  // randomatic('Aa0!', 10); //=> 'LV3u~BSGhw'  
  return randomatic('*', length);
}

// array of random number of x length
// also need count???
function createRandomNumberMultiple(length) {
  // var arr = [];
  // let config = new randNbr.Configuration();
  // config.setLength(length);
  // let arr = [];
  // let result = '';
  // if (length <= 16) {
  //   result = new randNbr.Generator(config).getNumber().getValue().toString();
  // } else {
  //   for (let i = 0; i < (length / 16); i++) {
  //     arr.push(new randNbr.Generator(config).getNumber().getValue().toString());
  //   }
  //   result = arr.join('');
  // }
  // return result;
  return Array(8).fill().map(() => rNum.rNumber(length))
}

function createCryptoString(length) {
  return cryptoRandomString(length);
}

function sayHello() {
  return 'Hello from Random Number JS file ...';
}

function getSessionKey() {
  return cryptoRandomString(16);
}
