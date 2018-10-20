const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  
  console.log('get request to /results page ... ')

  res.render('results', { message: 'in /results page ...' })
});



module.exports = router;