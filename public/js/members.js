$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/allList", function (res) {
      console.log("entered members.js");
      console.log(res)
      res.render("members", {watchList: res});
    });


  });