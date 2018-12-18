const cryptoRandomString = require('crypto-random-string'); // -- KEEP
// const randNbr = require('js-random-number');
const rNum = require('genrandom') // -- KEEP allows segmented & special chars
const rFloat = require('random-float');
const randomatic = require('randomatic'); // -- KEEP with special chars

// Randomatic Options ... 
const optAlphaNumeric = 'aA0';
const optNumeric = '0';
// const optAlphaNumericSpecialChars = '*';
const optAlphaNumericSpecialChars = 'Aa0!';

let count;
let lengthEach;
let format;
let formatCollection;
let sessionData;
let result;

exports.sayHi = sayHello;
exports.createCryptoString = createCryptoString;
exports.createRandomInt = createRandomInt;
exports.createRandomAlpha = createRandomAlpha;
exports.createRandomAlphaSpecialChars = createRandomAlphaSpecialChars;
exports.createRandomFloat = createRandomFloat;
exports.getSessionKey = getSessionKey;
exports.buildRandomNumberOutputFromOptions = buildRandomNumberOutputFromOptions;


/*  options :
sessionId: '033119fca1e03ea2',
  count: '1',
  lengthEach: '12',
  type: 'RANDOM NUMBER',
  format: 'rand-nbr-alpha',
  formatColl: 'comma-delimited',
  sessionInfo: 
   { sessionId: '033119fca1e03ea2',
     timestamp: '2018-11-17T05:11:00-05:00',
     timestring: 'November 17th 2018, 5:11:00 am' } }
*/

function buildRandomNumberOutputFromOptions(obj) {


  console.log('*** in generate random function, I received ... ', obj)
  
  
  switch (obj.format) {
    case 'rand-nbr-alpha':
      console.log('you selected alphanumeric')
      result = createRandomAlpha(parseInt(obj.lengthEach,10), parseInt(obj.count, 10))
      break;
    case 'rand-nbr-numeric':
      console.log('you selected numeric')
      result = createRandomInt(parseInt(obj.lengthEach,10), parseInt(obj.count, 10))
      break;
    case 'rand-nbr-float':
      console.log('you selected float')
      result = createRandomFloat(parseInt(obj.count, 10))
      break;
    case 'rand-nbr-mixed':
      console.log('you selected mixed')
      result = createRandomAlphaSpecialChars(parseInt(obj.lengthEach,10), parseInt(obj.count, 10))
      break;

    default:
      result = createErrorMessage()
      break;
  }

    // switch output format
    // if (isJsonArrayOutput) {
    //   ids = JSON.stringify(ids);
    // } else {
    //   ids = ids.join(",")
    // }

  return result;
}

function createRandomInt(length, count) {
  return Array(count).fill().map(() => { return randomatic(optNumeric, length) });
}

function createRandomAlpha(length, count) {
  return Array(count).fill().map(() => { return randomatic(optAlphaNumeric, length) })
}

function createRandomFloat(count) {
  return Array(count).fill().map(() => { return rFloat(1, 100) })
}

// TODO: make ALL FUNCTIONS use this library?
function createRandomAlphaSpecialChars(length, count) {
  console.log('about to return ', randomatic('Aa0!', 11))
  return Array(count).fill().map(() => { return randomatic('Aa0!', 11) })
}

function createErrorMessage() {
  return ["An Error Occured ... Please retry sending your request!"];
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
