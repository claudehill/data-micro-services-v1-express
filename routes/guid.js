const express = require('express');
const router = express.Router();
const util = require('util');
const uuid = require('../js/generate-guid');
const manageToken = require('../js/manage-token');
const bp = require('body-parser');


router.get('/', (req, res, next) => {

  let guidColl = uuid.createArray(100, 'v1', true, false);

  res.render('guid', { title: "Unique ID", message: 'Hello from Guid Page ...', collection: guidColl })

});

//TODO: add session variable to route and log
router.post('/submit', (req, res, next) => {
  console.log('post to /guid/submit ... ', req.body)
  res.redirect('/results/type')
});

module.exports = router;
