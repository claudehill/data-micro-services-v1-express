const express = require('express');
const router = express.Router();
const randomNbr = require('../public/javascripts/generate-random-number');

router.get('/', (req, res, next) => {
  var msg = randomNbr.sayHi();
  var nbr = randomNbr.createCryptoString(64);
  var int = randomNbr.createRandomInt(8);
  res.render('random-number', { title: "Random Number", message: msg, output: nbr, someNbr: int })
});

module.exports = router;