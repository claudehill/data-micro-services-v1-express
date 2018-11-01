
const randomNbr = require('../js/generate-random-number');

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

exports.optionsObj = optionsObj;
exports.getSessionId = getSessionId;