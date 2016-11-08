var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('movies').then(function (movies) {
    res.json(movies);
  }).catch(function (err) {
    next(new Error(err));
  });
});

//NEED TO WORK ON THIS
router.post('/', function (req, res, next) {
  knex('movies')
  .insert({
    title: req.body.title,
    release_year: req.body.release_year}
  )
  .returning(['id', 'title', 'release_year'])
  .then(function (movies) {
    console.log(movies[0].title);
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
  console.log(req.body.title);
  console.log("----------------");
  console.log(req.params.id);
  knex("movies")
  .where("id", "=", id)
  .update({
    title: req.body.title,
    release_year: req.body.release_year
  })
  .returning(['id', 'title', 'release_year'])
  .then(function (movies) {
    console.log(movies[0].title);
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
    // console.log(movies[0].title);
    res.json({
      statusCode: 200,
      results: movies
    });
  }).catch(function(err) {
    next(new Error(err));
  });
});

router.mkcol('/', function (req, res, next) {
  console.log("in the mkcol");
  knex.schema.table('movies', function (table) {
    table.decimal("rating")
    .returning(['id', 'title', 'release_year', 'rating'])
    .then(function (movies) {
      console.log(movies[0].title);
      res.json({
        statusCode: 200,
        results: movies
      });
    }).catch(function(err) {
      next(new Error(err));
    });
  });
});

module.exports = router;
