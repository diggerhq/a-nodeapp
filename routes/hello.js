var express = require('express');
var router = express.Router();

/* GET hello world page. */
router.get('/', function(req, res, next) {
  res.json({ 
    message: 'Hello World!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
