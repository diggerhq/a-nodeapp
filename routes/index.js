var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('*', function(req, res, next) {
  const testvar = process.env.TESTVAR;
  const host = req.get('host')
  const originalUrl = JSON.stringify(req.originalUrl)
  const querystring = JSON.stringify(req.query)
  res.render('index', { 
    title: 'Testvar: ' + testvar,
    host: host,
    querystring: querystring
  });
});

module.exports = router;
