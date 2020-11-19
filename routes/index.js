var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const testvar = process.env.TESTVAR;
  res.render('index', { title: 'Testvar: ' + testvar });
});

module.exports = router;
