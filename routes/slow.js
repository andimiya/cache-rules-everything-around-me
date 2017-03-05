
const express = require('express');
const redis = require('redis');
const sleep = require('../services/sleep');
const client = redis.createClient(); //creates a new client

const router = express.Router();

router.get('/', (req, res, next) => {
    //check if key exists in the cache
    client.exists('page', function(err, reply) {
      //if it does, then get the key from the client and display the value
      if (reply === 1) {
        client.get('page', function (err, reply) {
          console.log(reply, 'reply');
          res.send(reply);
        });

      } else {
          client.set(['page', `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>CREAM GET DA MONEY $$ Bills Y'all</title>
            </head>
            <body>
              </html>`]);
          client.expire('page', 30);
          return sleep(5000)
          .then(_ => res.render('api/index', (err, html) => {
        res.send(html);
      }));
       }
    });
  });

  //check if cached
  //render to redis
  //next time, page should come from redis

module.exports = router;
