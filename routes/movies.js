"use strict";

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();


router.get('/', function(req, res, next) {
  knex('movies').then(function (movies) {
    res.json(movies);
  }).catch(function (err) {
    next(new Error(err));
  });
});

//route before adding 'rating' column
// router.post('/', function (req, res, next) {
//   knex('movies')
//   .insert({
//     title: req.body.title,
//     release_year: req.body.release_year}
//   )
//   .returning(['id', 'title', 'release_year'])
//   .then(function (movies) {
//     res.json({
//       statusCode: 200,
//       results: movies
//     });
//   }).catch(function(err) {
//     next(new Error(err));
//   });
// });

// route after adding 'rating' column
router.post('/', function (req, res, next) {
  knex('movies')
  .insert({
    title: req.body.title,
    release_year: req.body.release_year,
    rating: req.body.rating}
  )
  .returning(['id', 'title', 'release_year', 'rating'])
  .then(function (movies) {
    res.json({
      statusCode: 200,
      results: movies
    });
  }).catch(function(err) {
    next(new Error(err));
  });
});


router.patch('/:id', function (req, res, next) {
  var id = req.params.id;
  knex("movies")
  .where("id", "=", id)
  .update({
    title: req.body.title,
    release_year: req.body.release_year
  })
  .returning(['id', 'title', 'release_year'])
  .then(function (movies) {
    res.json({
      statusCode: 200,
      results: movies
    });
  }).catch(function(err) {
    next(new Error(err));
  });
});

router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  knex("movies")
  .where("id", "=", id)
  .del()
  .returning(['id', 'title', 'release_year'])
  .then(function (movies) {
    res.json({
      statusCode: 200,
      results: movies
    });
  }).catch(function(err) {
    next(new Error(err));
  });
});


module.exports = router;
