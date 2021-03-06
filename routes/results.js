const express = require('express');
const router = express.Router();
const Storage = require('dom-storage');
const localStorage = new Storage('./db.json');
const genGuid = require('../js/generate-guid');
const genRandomJson = require('../js/generate-random-json');
const genRandomNumber = require('../js/generate-random-number');
const genText = require('../js/generate-text');
const utils = require('../js/utils');

const hi = require('../js/hello');
const optionsObject = utils.optionsObj;
let storageObj;
let modifiedObj;
let isConvertedStringFormat = false;


router.get('/', (req, res, next) => {

  console.log('get request to /results page ... ')
  console.log('from the hello module ', hi.sayHello())

  res.render('results', { message: 'in /results page ...' })
});

router.get('/:session', (req, res, next) => {
  console.log('get request to /results/:type route ... ')
  var session = req.params.session;
  var sessionObj = localStorage.getItem(session)
  console.log('SESSION was .... ', session)
  console.log('STORAGE OBJECT was .... ', storageObj)

  //TODO: remove this? just render page then re-call function
  // here, convert to string obj
  // if (!isConvertedStringFormat) {
  //   modifiedObj = convertToStringFormat(sessionObj)
  // }
 
  console.log('modified object (SESSION METHOD) ... ', modifiedObj)

  // res.render('results', { receipt: storageObj })
  res.render('results')
});

// wait until page loaded, then get receipt via post
router.get('/receipt/:id', (req, res, next) => {
  var sessionId = req.params.id
  var sessionObj = localStorage.getItem(sessionId);

  console.log('in the results file ... I got PARAMS .... ', req.params.id)
  console.log('in the results file / ID / ... I got this .... ', req.params.id)

  // rebuild object

  console.log('options object ... ', optionsObject)
  if (!isConvertedStringFormat) {
    modifiedObj = convertToStringFormat(sessionObj)
  }  
  console.log('modified object (RECEIPT ID METHOD) ... ', modifiedObj)

  // send as receipt
  console.log('modified object was ... ', modifiedObj)
  console.log('sessionID was .... ', sessionId)
  console.log('sessionObj was .... ', sessionObj)
  return res.json({ receipt: sessionObj })
});

router.get('/output/:id', (req, res, next) => {
  var sessionId = req.params.id;
  var sessionObj = localStorage.getItem(sessionId);
  console.log('SESSION OBJECT ... ', sessionObj)
  var results = utils.routeObjectByType(sessionObj);
  console.log('in results, output is ...... ', results)
  res.json({ results: results })
});

function convertToStringFormat(obj) {
  console.log('convert method ... VALUE INCOMING ** ', obj)

  switch (val = obj.type.toLowerCase()) {
    case val.includes('guid'):
     obj.strength = optionsObject[obj.strength];   
      break;
    case val.includes('random number'):
      obj.lengthEach = optionsObject[obj.rand-nbr-length-each];
      break;
  
    default:
      break;
  }
  obj.format = optionsObject[obj.format];
  obj.formatColl = optionsObject[obj.formatColl];
  isConvertedStringFormat = true;
  return obj;
}


//TODO: Implement some cool stuff ... 
//  1. pull session id from request --- DONE
//  2. do lookup of fake local storage -- DONE
//  3. pull all relevant data
//  4. create build request based on data
//  5. populate receipt --- WORKING ...
//  6. populate results
//  7. HANDLE ERRORS (client deletes session var)

module.exports = router;