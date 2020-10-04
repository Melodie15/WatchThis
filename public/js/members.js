/* eslint-disable prefer-arrow-callback */
$(document).ready(() => {
  $("#addItemForm").on("submit", function(event) {
    event.preventDefault();
    console.log("Entered pub members.js submit form");

    const newMovie = {
      title: $("#title")
        .val()
        .trim(),
      genre: $("#genre").val(),
      service: $("#service").val()
    };
    console.log("New Movie:");
    console.log(newMovie);

    $.post("/api/new", newMovie).then(() => {
      window.location.href = "/members";
    });
  });
});
