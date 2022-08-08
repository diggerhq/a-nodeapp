var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('*', function(req, res, next) {
  const testvar = process.env.TESTVAR;
  const host = req.get('host')
  const originalUrl = JSON.stringify(req.originalUrl)
  const querystring = JSON.stringify(req.query)
  const path = req.originalUrl
  const origin = req.get('origin');
  const headers = JSON.stringify(req.headers)

  res.render('index', { 
    title: 'Testvar: ' + testvar,
    host: host,
    querystring: querystring,
    path: path,
    origin: origin,
    headers: headers
  });
});

module.exports = router;
