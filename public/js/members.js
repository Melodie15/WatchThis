$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/allList", res => {
    console.log("entered members.js");
    console.log(res);
    console.log(res.data);
    res.render("members", { movieList: res.data });
  });
});