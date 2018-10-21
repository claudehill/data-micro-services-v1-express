const express = require('express');
const router = express.Router();
const randomTxt = require('../js/generate-text');

router.get('/', (req, res, next) => {
  let msg = randomTxt.sayHello();
  let txt = randomTxt.getLoremIpsumParagraphs();
  let fakeWrd = randomTxt.getFakeWords(10);
  res.render('random-text', { title: 'Random Text', message: msg, lorem: txt, fakeWords: fakeWrd })
});


module.exports = router;