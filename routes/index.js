var express = require('express');
var router = express.Router();
var globals = require('./globals');
const title = 'Home Page';

const jwt = require('jsonwebtoken');

var userMode;
var adBlocker;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, token");
  res.render('index', { title, message: 'Hello from home route ...' });
});

router.post('/token-test', verifyToken, (req, res) => {

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


// verify token ...
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader !== undefined) {
    // catch bearer token header here ...
    const bearerToken = bearerHeader.split(' ')[1];
    // set the token
    req.token = bearerToken;
    // call next middleware
    next();

  } else {
    // forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
