
const express = require('express');
const redis = require('redis');
const sleep = require('../services/sleep');
const client = redis.createClient(); //creates a new client
const cache = require('express-redis-cache');

const router = express.Router();

router.get('/', (req, res, next) => {
    client.exists('page', function(err, reply) {
      if (reply === 1) {
        res.render('api/index');
      } else {
          client.set(['page', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CREAM GET DA MONEY $$ Bills Y'all</title>
</head>
<body>
  {{{ body }}}
</body>
</html>`]);
          return sleep(5000)
          .then(_ => res.render('api/index', (err, html) => {
          // console.log('else');
        res.send(html);
      }));
       }
    });
  });

  //check if cached
  //render to redis
  //next time, page should come from redis

module.exports = router;
