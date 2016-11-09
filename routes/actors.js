"use strict";

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res, next) {
  knex('actors').then(function (actors) {
    res.json(actors);
  }).catch(function (err) {
    next(new Error(err));
  });
});

module.exports = router;
