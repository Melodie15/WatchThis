// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
// eslint-disable-next-line no-unused-vars
const { response } = require("express");
// eslint-disable-next-line no-unused-vars
const { contained } = require("sequelize");

//variables used
const omdbKey = "c45795aa";
const omdbTitleUrl = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=";

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  }); //end of user get

  //insert new movie in to db, then redirect to members
  app.post("/api/new", (req, res) => {
    // variables for storing response
    let image = "/assets/images/theater-sign.jpg";
    let ratingType = "no reviews available";
    let rating = "";
    //api call to omdb to get rating and image
    formTitle = req.body.title.replace(/\s/g, "+");
    axios
      .get(omdbTitleUrl + formTitle)
      .then(response => {
        if (response.data.Poster !== null) {
          image = response.data.Poster;
          console.log("Image = " + image);
        }
        if (response.data.Ratings !== null) {
          ratingType = response.data.Ratings[0].Source;
          rating = response.data.Ratings[0].Value;
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        db.List.create({
          title: req.body.title,
          genre: req.body.genre,
          service: req.body.service,
          UserId: req.user.id,
          rating: rating,
          ratingType: ratingType,
          image: image
        })
          .then(() => {
            res.redirect("/members");
          })
          .catch(err => {
            res.status(401).json(err);
          });
      });
  }); //end of new post

  //Route to delete a record
  app.post("/api/delete/:id", (req, res) => {
    db.List.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.redirect("/members");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  }); //end of delete

  //Route to update watched of a record
  app.post("/api/watch/:id/:bool", (req, res) => {
    console.log("bool= " + req.params.bool);
    console.log("id= " + req.params.id);
    db.List.update(
      {
        watched: req.params.bool
      },
      {
        where: { id: req.params.id }
      }
    )
      .then(() => {
        console.log(
          "id " + req.params.id + " updated watched to " + req.params.bool
        );
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  }); //end of watched put
}; //end of export
