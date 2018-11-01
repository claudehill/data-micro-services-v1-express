const express = require('express');
const router = express.Router();
const util = require('util');
const uuid = require('../js/generate-guid');
const manageToken = require('../js/manage-token');
const bp = require('body-parser');
const utils = require('../js/utils');
const generateGuid = require('../js/generate-guid');
const Storage = require('dom-storage');
const type = 'GUID';

let guidCount;
let guidFormat;
let guidOutputFormat;
let guidStrength;
let sessionData;
let sessionId;
let sessionDateTime;
let sessionDateTimeFormatted;

router.get('/', (req, res, next) => {

  let guidColl = uuid.createArray(100, 'v1', true, false);

  res.render('guid', { title: "Unique ID", message: 'Hello from Guid Page ...' })

});


//TODO: add session variable to route and log
//TODO: --- VALIDATE INPUT ---

router.post('/submit', (req, res, next) => {
  // FOR NOW, forward to build guid ... 
  guidCount = req.body['select-guid-count'];
  guidFormat = req.body['select-guid-format'];
  guidOutputFormat = req.body['select-guid-output-format'];
  guidStrength = req.body['select-guid-strength'];
  sessionData = JSON.parse(req.body['session-data']);
  sessionId = sessionData.sessionId;
  sessionDateTime = sessionData.timestamp;
  sessionDateTimeFormatted = sessionData.timestring;

  var output = generateGuid.createArray(guidCount, guidStrength, guidFormat, guidOutputFormat)
  console.info('called build guid .... >>> ', output)
  console.log('post to /guid/submit ... ', req.body)


  //FIXME: find a way to implment session storage ...
  // set session storage here ?....

  var localStorage = new Storage('./db.json', { strict: false, ws: '  ' })
  // var myValue = { foo: 'bar', baz: 'quux' };
  var dataVal = {};
  dataVal.sessionId = sessionId;
  dataVal.count = guidCount;
  dataVal.strength = guidStrength;
  dataVal.type = "Guid";
  dataVal.format = guidFormat;
  dataVal.formatColl = guidOutputFormat;
  dataVal.sessionInfo = sessionData;
  localStorage.setItem(sessionData.sessionId, dataVal);
  var obj = localStorage.getItem(sessionData.sessionId)

  console.log('session data >>>>>>>>>>>>>>> ', sessionData.sessionId)
  console.log('session data testing retrieval >>>>>>>>>>>>>>> ', sessionData.sessionId)
  console.log('dataval object was ........... >>>>>>>>>>>>>>> ', obj)

  res.redirect('/results/' + sessionData.sessionId);
});

module.exports = router;


//TODO: --- ADD MIDDLEWARE FUNCTIONS ---
//TODO: --- 1. VALIDATE INCOMING INPUT 
//TODO: --- 2. CREATE OBJECT TO FORWARD
//TODO: --- 3. GLOBALS, IS COUNT VALID?