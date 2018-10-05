const express = require('express');
const router = express.Router();
const util = require('util');
const uuid = require('../public/javascripts/generate-guid');

router.get('/', (req, res, next) => {

  let guidColl = uuid.createArray(100, 'v1', true, false);

  res.render('guid', { message: 'Hello from Guid Page ...', collection: guidColl })
})


module.exports = router;
