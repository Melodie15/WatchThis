// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const list = require("../models/list");

function createList(dbList) {
  const movieList = [];
  for (let i = dbList.length - 1; i >= 0; i--) {
    movie = {
      id: dbList[i].dataValues.id,
      title: dbList[i].dataValues.title,
      genre: dbList[i].dataValues.genre,
      service: dbList[i].dataValues.service,
      watched: dbList[i].dataValues.watched,
      ratingType: dbList[i].dataValues.ratingType,
      rating: dbList[i].dataValues.rating,
      image: dbList[i].dataValues.image,
      UserId: dbList[i].dataValues.UserId
    };
    movieList.push(movie);
  }
  return movieList;
}

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // calls create list to make list from response for rendering.
  app.get("/members", isAuthenticated, (req, res) => {
    //console.log(req);
    db.List.findAll({
      where: {
        userId: req.user.id
      }
    }).then(dbList => {
      //console.log(dbList);
      res.render("members", { movieList: createList(dbList) });
    });
  });
};
