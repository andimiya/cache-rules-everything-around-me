
const express = require('express');
const redis = require('redis');
const sleep = require('../services/sleep');
const client = redis.createClient(); //creates a new client

const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    client.exists('key', function(err, reply) {
      if (reply === 1) {
        console.log('exists');
      } else {
          client.set(['key', 'test']);
          return sleep(5000)
          .then(_ => res.render('api/index', (err, html) => {
          console.log('else');
        res.send(html);
      }));    }
    });
  });

  //check if cached
  //render to redis
  //next time, page should come from redis

module.exports = router;
