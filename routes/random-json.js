const express = require('express');
const router = express.Router();
const randomJson = require('../js/generate-random-json');

router.get('/', (req, res, next) => {
  // var msg = 'Hello from random-json route';
  var msg = randomJson.sayHi();
  var fake = JSON.stringify(randomJson.makeFake(), null, 2);
  console.log(fake)
  res.render('random-json', { title: 'hello there ...', message: msg, fakeJson: fake })
})

module.exports = router;