const express = require('express');
const router = express.Router();
const randomNbr = require('../js/generate-random-number');
const Storage = require('dom-storage');
const type = 'RANDOM NUMBER';

let randNbrCount;
let randNbrFormat;
let randNbrOutputFormat;
let randNbrLength;
let sessionData;

router.get('/', (req, res, next) => {
  var msg = randomNbr.sayHi();
  var nbr = randomNbr.createCryptoString(64);
  // var int = randomNbr.createRandomInt(32);
  var intNbr = randomNbr.createRandomInt(5)
  // var intNbr = randomNbr.createRandomNumber();
  // var randNbr = randomNbr.createRandomNumberMultiple(32);
  // var randSpecial = randomNbr.createRandomAlphaSpecialChars(128);
  res.render('random-number', { title: 'Random Number', message: msg })
});


router.post('/submit', (req, res) => {

  console.log('random number / submit response ... ', req.body)
  randNbrCount = req.body['select-count'];
  randNbrFormat = req.body['select-format'];
  randNbrOutputFormat = req.body['select-output-format'];
  randNbrLength = req.body['input-rand-nbr-length'];
  sessionData = (typeof req.body['session-data'] === 'object') ? JSON.parse(req.body['session-data'][0]) : JSON.parse(req.body['session-data'])  

  sessionId = sessionData.sessionId;
  sessionDateTime = sessionData.timestamp;
  sessionDateTimeFormatted = sessionData.timestring;

  var localStorage = new Storage('./db.json', { strict: false, ws: '  ' })
  var dataVal = {};
  dataVal.sessionId = sessionId;
  dataVal.count = randNbrCount;
  dataVal.lengthEach = randNbrLength;
  dataVal.type = type;
  dataVal.format = randNbrFormat;
  dataVal.formatColl = randNbrOutputFormat;
  dataVal.sessionInfo = sessionData;


  localStorage.setItem(sessionData.sessionId, dataVal);
  var obj = localStorage.getItem(sessionData.sessionId)


  console.log('session data >>>>>>>>>>>>>>> ', sessionData.sessionId)
  console.log('session data testing retrieval >>>>>>>>>>>>>>> ', sessionData.sessionId)
  console.log('dataval object was ........... >>>>>>>>>>>>>>> ', obj)
  console.log('randNbrCount ', randNbrCount)
  console.log('randNbrFormat ', randNbrFormat)
  console.log('randNbrOutputFormat ', randNbrOutputFormat)
  console.log('randNbrLength ', randNbrLength)
  console.log('sessionData  ', sessionData)
  console.log('sessionId ', sessionId)
  console.log('sessionDateTime ', sessionDateTime)
  console.log('sessionDateTimeFormatted ', sessionDateTimeFormatted)


  // res.json({ msg: 'Successful post to .. / submit ' })

  res.redirect('/results/' + sessionId);

})

module.exports = router;