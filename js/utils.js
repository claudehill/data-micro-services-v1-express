
const Storage = require('dom-storage');
const localStorage = new Storage('./db.json');
const randomNbr = require('../js/generate-random-number');
const genGuid = require('../js/generate-guid');

let sessionId;

//TODO: Add to this collection for new data formats ...
const optionsObj = {
  'guid-strength-v1': 'RFC4122 SPEC version 1',
  'guid-strength-v4': 'RFC4122 SPEC version 4',
  'guid-dashes': 'Guids have Dashes',
  'guid-no-dashes': 'Guids do not have Dashes',
  'guid-comma': 'Comma Delimited',
  'guid-array': 'String Array'
}

function getSessionId() {
  sessionId = randomNbr.getSessionKey();
  return sessionId;
};

// 1. route object to proper type -- DONE
// 2. lookup params -- DONE
// 3. call method based on params
// 4. return final output - dynamic

function routeObjectByType(obj) {
  // var obj = // sessionid lookup
  console.log('THIS IS THE OBJ INCOMING ... ', obj)
  var storageObj = localStorage.getItem(obj.sessionId);
  var input = storageObj.type.toLowerCase();
  var output;
  switch (input) {
    case 'guid':
      output = genGuid.buildGuidArrayFromOptions(storageObj);
      break;

    default:
      break;
  }
  return output;
}

exports.routeObjectByType = routeObjectByType;
exports.optionsObj = optionsObj;
exports.getSessionId = getSessionId;