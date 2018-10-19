const express = require('express');
const router = express.Router();
const util = require('util');
const uuid = require('../public/javascripts/generate-guid');
const manageToken = require('../public/javascripts/manage-token');
const bp = require('body-parser');

router.get('/', (req, res, next) => {

  let guidColl = uuid.createArray(100, 'v1', true, false);

  res.render('guid', { title: "Unique ID", message: 'Hello from Guid Page ...', collection: guidColl })

});

router.post('/options', (req, res) => {
  console.log('post to /guid ... ', req.body)
  res.send('hello')
  res.end();
});

module.exports = router;
