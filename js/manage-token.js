const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
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
let modeObj = { true: 'RESTRICTED', false: 'UNRESTRICTED' }
var userMode;
var adBlocker;

let bearerToken;
let decodedToken;

module.exports.fetchTokenAdblocker = fetchTokenAdblocker;
module.exports.decodeToken = decodeToken;
module.exports.verifyToken = verifyToken;
module.exports.getCurrentUserMode = getCurrentUserMode;

 function fetchTokenAdblocker(isAdblockDetectedOnPage) {
  userMode = modeObj[isAdblockDetectedOnPage]
  let tokenData = {
    adblocker_detected: isAdblockDetectedOnPage,
    user_mode: modeObj[isAdblockDetectedOnPage]
  }
  // -- SYNCHRONOUS FUNCTION ... 
  // ASYNC WONT RETURN IN TIME
  bearerToken = jwt.sign({tokenData: tokenData }, 'MY_SECRET', { expiresIn: 15 * 1000 })
  console.log('Manage token js file ... returning bearerToken >> ', bearerToken)
  console.log('Manage token js file ... returning userMode >>', userMode)
  return bearerToken;
}

/****************************
Warning: This will not verify whether the signature is valid. 
You should not use this for untrusted messages. 
You most likely want to use jwt.verify instead.
****************************/
function decodeToken(token) {
   decodedToken = jwt.decode(token, { complete: true })
   console.log('manage-token | decoded token was ... ', decodedToken);
   return decodedToken;
}

function verifyToken(token) {
  decodedToken = jwt.verify(token, 'MY_SECRET');
  console.log('manage-token | verified token was ... ', decodedToken)
  return decodedToken;
}

function getCurrentUserMode() {
  return userMode;
}
