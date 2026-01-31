var express = require('express');
var router = express.Router();

/* GET hello world. */
router.get('/', function(req, res, next) {
  res.send('Hello World!');
});

module.exports = router;
