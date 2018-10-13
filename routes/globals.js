const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');

// since this is only a test, we're building the logic directly in the router, not JS
const jwt = require('jsonwebtoken');

// this goes in environment variable for system
// EXAMPLE: process.env.SECRET_KEY = "my_cool_secret_key";
// or USE DOT ENV ... store
let secretPhrase = 'every villain is lemons';
/*
var token = req.body.token || req.headers['token']
user has 2 options to pass through... body or headers
*/
let isAdblockDetected = true;
let mode = 'RESTRICTED'; // 'UNRESTRICTED'

var userMode;
var adBlocker;

let bearerToken = {};

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
  console.log('mode ... ', mode )
  console.log('req.body[adblocker] ... ', req.body['adblocker'] )
  console.log('isAdblockDetected ... ', isAdblockDetected)

  var tokenData = {
    adblocker_detected: isAdblockDetected,
    user_mode: mode
  }
  // expire token in 15 secs ...
  jwt.sign({ tokenData: tokenData }, 'MY_SECRET', { expiresIn: 15 * 1000 },
    (err, token) => {
      bearerToken = { 'token': 'Bearer ' + token };
      console.log('Request body entered POST /token-fetch as ...', req.body);
      res.json({ message: 'response from globals ...', 'token': token, layout: false })
    })
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
      console.log('from /token-test, userMode ... ', userMode);
      console.log('from /token-test, adBlocker ... ', adBlocker);
      res.json({ message: 'success ... ', authData, userMode, adBlocker })
    }
  })
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
