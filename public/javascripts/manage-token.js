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

module.exports.fetchToken = fetchToken;
module.exports.decodeToken = decodeToken;
module.exports.verifyToken = verifyToken;

 function fetchToken(isAdblockDetectedOnPage) {

  userMode = modeObj[isAdblockDetectedOnPage]
  let tokenData = {
    adblocker_detected: isAdblockDetectedOnPage,
    user_mode: modeObj[isAdblockDetectedOnPage]
  }
  // -- SYNCHRONOUS FUNCTION ... 
  // ASYNC WONT RETURN IN TIME
  bearerToken = jwt.sign({tokenData: tokenData }, 'MY_SECRET', { expiresIn: 15 * 1000 })

  // jwt.sign({ tokenData: tokenData }
  //   , 'MY_SECRET' // -- SECRET PHRASE, CHANGE THIS!!!
  //   , { expiresIn: 15 * 1000 } // -- EXPIRE IN 15 SECONDS!!!
  //   , (err, token) => {
  //     if (err) {
  //       return err;
  //     } else {
  //       bearerToken = token;
  //       console.log('Manage token js file ... returning bearerToken >> ', token)
  //       console.log('Manage token js file ... returning userMode >>', userMode)
  //     }
  //   })
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
   console.log('decoded token was ... ', decodedToken);
   return decodedToken;
}

function verifyToken(token) {

  decodedToken = jwt.verify(token, 'MY_SECRET');
  console.log('decoded token was ... ', decodedToken)
  return decodedToken;

}


// router.post('/token-verify', verifyToken, (req, res) => {

//   // console.log('logging req headers in /token-test route ... ', req.headers)
//   // res.setHeader("Access-Control-Allow-Headers", "x-access-token, token");

//   jwt.verify(req.token, 'MY_SECRET', (err, authData) => {
//     if (err) {
//       userMode = 'RESTRICTED';
//     } else {
//       userMode = authData.tokenData.user_mode;
//       adBlocker = authData.tokenData.adblocker_detected;
//       console.log('from /token-verify, userMode ... ', userMode);
//       console.log('from /token-verify, adBlocker ... ', adBlocker);
//       res.json({ message: 'success ... ', authData, userMode, adBlocker })
//     }
//   })
// });


// format of token
// authorization: Bearer <access_token>

// verify token ...
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization'];
//   // check if bearer token is undefined
//   if (typeof bearerHeader !== undefined) {
//     // catch bearer token header here ...
//     const bearerToken = bearerHeader.split(' ')[1];
//     // set the token ...
//     req.token = bearerToken;
//     // call next middleware to continue ...
//     next();
//   } else {
//     // dont send anything ... look for undefined ...
//   }
// }