var express = require('express');
var router = express.Router();
var globals = require('./globals');
const title = 'Home Page';
const manageToken = require('../public/javascripts/manage-token');

const jwt = require('jsonwebtoken');

var userMode;
var adBlocker;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, token");
  res.render('index', { title, message: 'Hello from home route ...' });
});

// GET test route for token
router.get('/test', (req, res, next) => {
  var myToken, decodedToken, verifiedToken;
  myToken = manageToken.fetchToken(true);
  decodedToken = manageToken.decodeToken(myToken);
  verifiedToken = manageToken.verifyToken(myToken);

  console.log('logging myToken response ... ', myToken)
  console.log('logging decoded response ... ', decodedToken)
  console.log('logging verified response ... ', verifiedToken)
  // res.json({ message: 'hello there ... ', myToken })
  // res.json({ message: 'hello there decoded ... ', decodedToken})
  res.json({ message: 'hello there verified ... ', verifiedToken})
  
})


// router.post('/token-test', verifyToken, (req, res) => {

//   // console.log('logging req headers in /token-test route ... ', req.headers)
//   // res.setHeader("Access-Control-Allow-Headers", "x-access-token, token");
  
//   jwt.verify(req.token, 'MY_SECRET', (err, authData) => {
//     if (err) {
//       userMode = 'RESTRICTED';
//     } else {
//       userMode = authData.tokenData.user_mode;
//       adBlocker = authData.tokenData.adblocker_detected;
//       console.log('from /token-test, userMode ... ', userMode);
//       console.log('from /token-test, adBlocker ... ', adBlocker);
//       res.json({ message: 'success ... ', authData, userMode, adBlocker })
//     }
//   })
// });


// verify token as middleware...
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization'];
//   // check if bearer is undefined
//   if (typeof bearerHeader !== undefined) {
//     // catch bearer token header here ...
//     const bearerToken = bearerHeader.split(' ')[1];
//     // set the token
//     req.token = bearerToken;
//     // call next middleware
//     next();

//   } else {
//     // forbidden
//     res.sendStatus(403);
//   }
// }

module.exports = router;
