const express = require('express');
const router = express.Router();
require ('./../util/util')
const User = require('./../models/user.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req,res,next) {
  res.send('test');
})
module.exports = router;
