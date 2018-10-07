const express = require('express');
const router = express.Router();
const randomNbr = require('../public/javascripts/generate-random-number');

router.get('/', (req, res, next) => {
  var msg = randomNbr.sayHi();
  var nbr = randomNbr.createCryptoString(64);
  // var int = randomNbr.createRandomInt(32);
  // var intNbr = randomNbr.createRandomInt(5)
  var intNbr = randomNbr.createRandomNumber();
  var randNbr = randomNbr.createRandomNumberMultiple(32);
  var randSpecial = randomNbr.createRandomAlphaSpecialChars(128);
  res.render('random-number', { title: 'hello', message: msg, output: nbr, someNbr: intNbr, randNbr: randNbr, randNbrSpecial: randSpecial })
});

module.exports = router;