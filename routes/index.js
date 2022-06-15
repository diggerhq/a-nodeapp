var express = require('express');
var router = express.Router();
// import { createClient } from 'redis';
var redis = require("redis");


async function redis_test(url) {
  const client = redis.createClient({
    url: url
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
  return value
}

/* GET home page. */
router.all('*', async function(req, res, next) {
  
  const REDIS_URL = process.env.REDIS_URL
  let value = await redis_test(REDIS_URL)
  const testvar = process.env.TESTVAR + "reds_value: " + value;

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
