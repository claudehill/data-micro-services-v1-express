const express = require('express');
const router = express.Router();

const hi = require('../js/hello');


router.get('/', (req, res, next) => {
  
  console.log('get request to /results page ... ')

  console.log('from the hello module ', hi.sayHello())

  res.render('results', { message: 'in /results page ...' })
});

router.get('/:type', (req, res, next) => {
  console.log('get request to /results/:type route ... ')
  var type = req.params.type;
  console.log('type was .... ', type)



  res.render('results')

})



module.exports = router;