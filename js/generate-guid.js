const uuid = require('uuid');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3'); // not implemented
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5'); // not implemented
const manageToken = require('./manage-token');

let isJsonArrayOutput = false; // default... do we want ["x", "y"] array?
let hasDashes = true; // default...

exports.createArray = buildGuidArray;
exports.sayHi = sayHello;

// example ... 
// console.log([...Array(100).keys()].map(i => new Date()));

function buildGuidArray(count, version, hasDashes, isJsonArrayOutput) {
  let ids = [];
  switch (version) {
    case 'v4':
      ids = Array(count).fill().map(() => '\n', uuidv4());
      break;
    // add other versions here ...
    default:
      ids = Array(count).fill().map(() => '\n' + uuidv1());
      break;
  }

  // did user choose no dashes?
  if (!hasDashes) {
    ids = removeDashesFromGuidArray(ids);
  }

  // switch output format
  if (isJsonArrayOutput) {
    ids = JSON.stringify(ids);
  }

  return ids;
}

function removeDashesFromGuidArray(arrayToChange) {
  let resultArr = arrayToChange.map(x => { return x.replace(/-/g, '') })
  return resultArr;
}

function sayHello() {
  return 'Hello from UUID.js file ... ';
}