const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const manageToken = require('../js/manage-token');
const moment = require('moment');
const axios = require('axios');
const request = require('request');
const randomNbr = require('../js/generate-random-number');
const utils = require('../js/utils');

// since this is only a test, we're building the logic directly in the router, not JS
const jwt = require('jsonwebtoken');

/*
var token = req.body.token || req.headers['token']
user has 2 options to pass through... body or headers
*/
let isAdblockDetected = true;
let mode = 'RESTRICTED'; // 'UNRESTRICTED'
let userMode;
let adBlocker;
let bearerToken;
let sessionKey;

// return a token that has the value of adblocker
router.post('/token-fetch', (req, res, next) => {
  // get value of client post (do we have adblocker present)
  if (req.body['adblocker'] === 'undefined') {
    isAdblockDetected = true;
  } else {
    console.log('in POST /token-fetch - adblocker status ... ', req.body['adblocker']) // yes, works!!
    isAdblockDetected = req.body['adblocker'];
  }
  mode = (isAdblockDetected) ? 'RESTRICTED' : 'UNRESTRICTED';
  bearerToken = { 'token': 'Bearer ' + manageToken.fetchTokenAdblocker(isAdblockDetected) };
  console.log('token response from manage-token ... ', bearerToken)
  res.json({ message: 'response from globals ...', token: bearerToken })
});


router.post('/token-verify', verifyToken, (req, res) => {

  // console.log('logging req headers in /token-test route ... ', req.headers)
  // res.setHeader("Access-Control-Allow-Headers", "x-access-token, token");

  jwt.verify(req.token, 'MY_SECRET', (err, authData) => {
    if (err) {
      userMode = 'RESTRICTED';
    } else {
      userMode = authData.tokenData.user_mode;
      adBlocker = authData.tokenData.adblocker_detected;
      console.log('from /token-verify, userMode ... ', userMode);
      console.log('from /token-verify, adBlocker ... ', adBlocker);
      res.json({ message: 'success ... ', authData, userMode, adBlocker })
    }
  })
});


//TODO: *** REMOVE PRIVATE KEY ***
router.post('/recaptcha-verify', (req, res) => {

  if (req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null) {
    return res.json({ "success": false, "msg": "please select captcha" })
  }

  // Secret Key
  const secretKey = process.env.RECAPTCHA_KEY;

  // verifyUrl
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make request to VerifyUrl
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    // If NOT successful
    if (body.success !== undefined && !body.success) {
      console.log('the body was ................. >>> ', body)
      return res.json({ "success": false, "msg": "failed captcha verification" });
    }

    // If successful
    console.log('the body was ................. >>> ', body)
    return res.json({ "success": true, "msg": "captcha passed" });
  });
});

// use with receipt functions
router.get('/session-id', (req, res) => {
  return res.json({ sessionId: utils.getSessionId(), timestamp: moment().format(), timestring: moment().format('MMMM Do YYYY, h:mm:ss a') })
});

// format of token
// authorization: Bearer <access_token>
// verify token ...
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  // check if bearer token is undefined
  if (typeof bearerHeader !== undefined) {
    // catch bearer token header here ...
    const bearerToken = bearerHeader.split(' ')[1];
    // set the token ...
    req.token = bearerToken;
    // call next middleware to continue ...
    next();
  } else {
    // dont send anything ... look for undefined ...
  }
}


module.exports = router;
