const uuid = require('uuid');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3'); // not implemented
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5'); // not implemented
const manageToken = require('./manage-token');
const Storage = require('dom-storage');
const localStorage = new Storage('./db.json');

let isJsonArrayOutput = false; // default... do we want ["x", "y"] array?
let hasDashes = true; // default...
let storageObj;

exports.createArray = buildGuidArray;
exports.sayHi = sayHello;
exports.lookupGuidOptions = lookupGuidOptions;
exports.buildGuidArrayFromOptions = buildGuidArrayFromOptions;

function lookupGuidOptions(storageId) {
  console.log('in generate-guid file/ lookupGuidOptions()... ID ', storageId)
  console.log('in generate-guid file/ lookupGuidOptions()... TYPE OF > ID ', typeof storageId)

  storageObj = localStorage.getItem(storageId)

  console.log('in generate-guid file/ lookupGuidOptions()... storageObj ', storageObj)

  return storageObj;
}

function buildGuidArrayFromOptions(obj) {
  var s = {};
  s.count = obj.count;
  console.log('BUILD GUID METHOD OBJ ... ', obj)
  s.version = (obj.strength === 'guid-strength-v4') ? 'v4' : 'v1';
  s.hasDashes = obj.format === 'guid-dashes';
  console.log('DASHES WERE S ... ', s.hasDashes)
  s.isJsonArrayOutput = obj.formatColl = 'guid-array';
  console.log('BUILD GUID ARRAY OP ... ', buildGuidArray(s.count, s.version, s.hasDashes, s.isJsonArrayOutput))
  return buildGuidArray(s.count, s.version, s.hasDashes, s.isJsonArrayOutput);
}

// example ... 
// console.log([...Array(100).keys()].map(i => new Date()));

function buildGuidArray(count, version, hasDashes, isJsonArrayOutput) {
  let ids = [];
  switch (version) {
    case 'v4':
      ids = Array(count).fill().map(() => uuidv4());
      break;
    // add other versions here ...
    default:
      ids = Array(count).fill().map(() => uuidv1());
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