"use strict";

var app = require('../app');
var knex = require("../db/knex");
var expect = require('chai').expect;
var request = require('supertest')(app);

beforeEach(function() {
  return knex.seed.run(knex.config);
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
        if (err) return done(err);
        expect(res.body.length).to.eq(4);
        done();
      });
    });
  });

  describe("Display information from joined tables", function() {
    it("Should return an object with title, release_year, name, dob and character (from a joined table from appearances, movies and actors)", function (done) {
      request
      .get('/api/v1/appearances')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
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

  // describe("Create record of a new movie",function () {
  //   it("Should return a response that includes id, title, and release_year of the new movie",function (done) {
  //     let movieTest = {
  //       title: "The Godfather",
  //       release_year: 1972};
  //       request
  //       .post("/api/v1/movies")
  //       .send(movieTest)
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) {
  //           return done(err);
  //         }
  //         expect(res.body.results[0].title).to.eql("The Godfather");
  //         expect(res.body.results[0].release_year).to.eql(1972);
  //         done();
  //       });
  //     });
  //   });

  describe("Add a column to 'movies' called 'rating'", function () {
    it("Should return a response that includes id, title, release_year, and rating of the new movie", function (done) {
        let movieTest = {
          title: "The Godfather",
          release_year: 1972,
          rating: 10};
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
            expect(res.body.results[0].rating).to.eql(10);
            done();
          });
        });
      });

  describe("Update an existing movie record", function () {
    it("Should return a response that includes id, title, and release_year of the updated movie", function(done) {
      let movieTest = {
        title: "Singin' in the Rain",
        release_year: 1952
      };
      request
      .patch("/api/v1/movies/1")
      .send(movieTest)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body.results[0].title).to.eql("Singin' in the Rain");
        expect(res.body.results[0].release_year).to.eql(1952);
        done();
      });
    });
  });

  describe("Delete an existing movie record", function () {
    it("Should delete the selected movie record from the database", function (done) {
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
