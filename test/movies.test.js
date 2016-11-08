"use strict"

var expect = require('chai').expect;
var app = require('../app')
var request = require('supertest')(app);
var knex = require("../db/knex")

beforeEach(function() {
  return knex.seed.run(knex.config)
});

// afterEach(function(done) {
//   // knex("movies").del().then(function(){
//   //   return done()
//   // })
//   return done()
// });

  describe("something", function () {
    it("works", function (done) {
      request.get('/api/v1/movies')
      .expect(200)
      .end(function (err, res) {
        // console.log(res);
        if (err) return done(err);
        expect(res.body.length).to.eq(4);
        done();
      });
    });
  });

  describe("Join of different tables", function() {
    it("Should return a joined table from appearances, movies and actors with title, release_year, name, dob and character", function (done) {
      request
      .get('/api/v1/appearances')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        // console.log(res.body[0]);
        expect(res.body).to.eql([{
          "title": "Bourne Identity",
          "release_year": 2002,
          "name": "Matt Damon",
          "dob": "1970-10-08T07:00:00.000Z",
          "character": "Jason Bourne"
        },
        {
          "title": "Good Will Hunting",
          "release_year": 1997,
          "name": "Matt Damon",
          "dob": "1970-10-08T07:00:00.000Z",
          "character": "Will Hunting"
        },
        {
          "title": "Shawshank Redemption",
          "release_year": 1994,
          "name": "Morgan Freeman",
          "dob": "1937-06-01T07:00:00.000Z",
          "character": "Red"
        },
        {
          "title": "Shawshank Redemption",
          "release_year": 1994,
          "name": "Tim Robbins",
          "dob": "1958-10-16T07:00:00.000Z",
          "character": "Andy Dufresne"
        }]);
        done();
      });
    });
  });

  describe("New movie creation",function () {
    it("should return a response including an id, a title and a release_year",function (done) {
      let movieTest = {
        title: "The Godfather",
        release_year: 1972};
        request
        .post("/api/v1/movies")
        .send(movieTest)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body.results[0].title).to.eql("The Godfather");
          expect(res.body.results[0].release_year).to.eql(1972);
          done();
        });
      });
    });

describe("Update movies", function () {
  it("Should return a response with the id, title and release_year of the updated movie", function(done) {
    let movieTest = {
      title: "The Godmother",
      release_year: 1932
    };
    request
    .patch("/api/v1/movies/1")
    .send(movieTest)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.results[0].title).to.eql("The Godmother");
      expect(res.body.results[0].release_year).to.eql(1932);
      done();
    });
  });
});

describe("Delete movie", function () {
  it("Should delete the selected movie from the database", function (done) {
    request
    .delete("/api/v1/movies/1")
    .expect(200)
    .end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.results[0].title).to.eql("Shawshank Redemption");
      expect(res.body.results[0].release_year).to.eql(1994);
      done();
    });
  });
});
