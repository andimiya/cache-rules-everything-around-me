const express = require('express');
const redis = require('redis');
const sleep = require('../services/sleep');
// const cache = require('express-redis-cache')({ host: "127.0.0.1", port: "6379" });
const router = express.Router();

router.get('/', (req, res, next) => {
    return sleep(5000)
    .then(_ => res.render('api/index', (err, html) => {
    res.send(html);
      }));
  });

module.exports = router;
