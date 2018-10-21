var express = require('express');
var router = express.Router();
var globals = require('./globals');
const title = 'Home Page';
const manageToken = require('../js/manage-token');

const jwt = require('jsonwebtoken');

var userMode;
var adBlocker;

//TODO: add session variable to route and log
/* GET home page. */
router.get('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, token");
  res.render('index', { title, message: 'Hello from home route ...' });
});

// GET test route for token
router.get('/test', (req, res, next) => {
  var myToken, decodedToken, verifiedToken;
  myToken = manageToken.fetchTokenAdblocker(true);
  decodedToken = manageToken.decodeToken(myToken);
  verifiedToken = manageToken.verifyToken(myToken);

  console.log('logging myToken response ... ', myToken)
  console.log('logging decoded response ... ', decodedToken)
  console.log('logging verified response ... ', verifiedToken)
  // res.json({ message: 'hello there ... ', myToken })
  // res.json({ message: 'hello there decoded ... ', decodedToken})
  res.json({ message: 'hello there verified ... ', verifiedToken})
  
})




module.exports = router;
