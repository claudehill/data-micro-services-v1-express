const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');

// since this is only a test, we're building the logic directly in the router, not JS
const jwt = require('jsonwebtoken');

// this goes in environment variable for system
// EXAMPLE: process.env.SECRET_KEY = "my_cool_secret_key";
let secretPhrase = 'every villain is lemons'; 


/*
var token = req.body.token || req.headers['token']
user has 2 options to pass through... body or headers

*/

router.get('/api', (req, res, next) => {
  // res.json({ message: 'Welcome to the JWT API ... ' })
  res.render('jwt-test-page', { title: 'hello' })
});

// --- PROTECTED ROUTE ---
router.post('/api/secret-page', verifyToken, (req, res, next) => {
  jwt.verify(req.token, secretPhrase, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: 'you accessed the SECRET PAGE ...', authData })
    }
  });
});



router.get('/api/secret-page', verifyToken, (req, res, next) => {
  console.log(req.headers['authorization'])
  jwt.verify(req.token, secretPhrase, (err, authData) => {
    (err) ? res.sendStatus(403).send('Invalid token') : res.json({ message: 'Welcome to the SECRET PAGE ... ', authData })
  })
})

// post to adblock check options
// post to request the secret page / resource
router.post('/api/access-secret', (req, res, next) => {
  // mock post, but could be user credentials
  // here, simulating adblock options
  // we could do a fetch to the resource on page load
  // if the check returns bool, then set option here
  const options = {
    timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
    timestamp_expires: moment().add(1, 'hour').calendar(),
    adblocker_detected: true
  }

  // expire the token in 2 mins ...
  jwt.sign({ options: options }, secretPhrase, { expiresIn: '1 hour' }, (err, token) => {
    // localStorage.setItem('token', token)
    res.json({ token: token })
  });
});

// --- PASS TOKEN TO ANOTHER ROUTE ---
router.get('/api/page-needs-token', (req, res, next) => {
  res.json({ message: 'This page needs a token' })
})



// format of token
// authorization: bearer <access_token>

// verify token ... 
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader !== undefined) {
    // catch bearer token header here ...
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
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
