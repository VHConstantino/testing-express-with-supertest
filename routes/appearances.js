"use strict";

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res, next) {
  knex("movies")
  .select("movies.title", "movies.release_year", "actors.name", "actors.dob", "appearances.character")
  .innerJoin("appearances", "movies.id", "appearances.movie_id")
  .innerJoin("actors", "actors.id", "appearances.actor_id").orderBy('release_year', 'desc').orderBy('name', 'asc')
  .then(function (appearances) {
    res.json(appearances)
  }).catch(function (err) {
    next(new Error(err));
  })
});

module.exports = router;
