var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// router.get('/', function(req, res, next) {
//   knex('appearances').then(function (appearances) {
//     console.log(appearances)
//     res.json(appearances)
//   }).catch(function (err) {
//     next(new Error(err));
//   })
// });

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

// knex("movies")
// .select("movies.title", "movies.release_year", "actors.name", "actors.dob", "appearances.character")
// .innerJoin("appearances", "movies.id", "appearances.movie_id")
// .innerJoin("actors", "actors.id", "appearances.actor_id")

module.exports = router;
