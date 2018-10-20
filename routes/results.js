const express = require('express');
const router = express.Router();




router.get('/', (req, res, next) => {
  
  console.log('get request to /results page ... ')

  res.render('results', { message: 'in /results page ...' }).catch(err => console.log(err))
});

router.get('/:type', (req, res, next) => {
  console.log('get request to /results/:type route ... ')
  var type = req.params.type;
  console.log('type was .... ', type)

  res.render('results').catch(err => { console.log(err) })

})



module.exports = router;