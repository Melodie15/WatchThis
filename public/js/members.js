/* eslint-disable prefer-arrow-callback */
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/allList", res => {
    console.log("entered members.js");
    console.log(res);
    console.log(res.data);
    res.render("members", { movieList: res.data });
  });

  $("#addItemForm").on("submit", function(event) {
    event.preventDefault();

    const newMovie = {
      title: $("#title")
        .val()
        .trim(),
      genre: $("#genre").val(),
      service: $("#service").val()
    };

    $.post("/api/new", newMovie).then(function(data) {
      console.log(data);
    });
  });
});
