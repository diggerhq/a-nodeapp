var express = require('express');
var router = express.Router();
// import { createClient } from 'redis';
var redis = require("redis");
let mysql = require('mysql');


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

function mysql_test(url) {

    let connection = mysql.createConnection({
      url: url
    });

    connection.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }

      console.log('Connected to the MySQL server.');
    })  
  }


router.get("/test-mysql", async function(req, res, next) {
  console.log("aadsfadsfs")
  req.on('error', function blah () {});
  const DATABASE_URL = process.env.DATABASE_URL

  const host = req.get('host')
  const originalUrl = JSON.stringify(req.originalUrl)
  const querystring = JSON.stringify(req.query)
  const path = req.originalUrl
  const origin = req.get('origin');
  const headers = JSON.stringify(req.headers)

  // let value = await redis_test(REDIS_URL)
  let value = "xx"
  try {
    mysql_test(DATABASE_URL)    
  } catch(e) {
    next(e)
    console.log(e)
  }

  res.render('index', { 
    title: 'Testvar: ',
    host: host,
    querystring: querystring,
    path: path,
    origin: origin,
    headers: headers
  });    
})

/* GET home page. */
router.get('/', async function(req, res, next) {

  const REDIS_URL = process.env.REDIS_URL

  const value = "redis"
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
