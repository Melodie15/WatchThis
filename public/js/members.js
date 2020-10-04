//Add Movie / Hide form functionality
$("#toggleFormButton, #hideForm").click(() => {
  $("#addItemForm").toggle("slow", function() {
    $("#toggleFormButton").text(
      $(this).is(":visible") ? "Hide Form" : "Enter a New Movie or Show"
    );
  });
});
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

  $("#deleteBtn").on("click", function(event) {
    event.preventDefault();
    const id = $(this).data("id");
    console.log(id);
    $.post("/api/delete/" + id).then(() => {
      window.location.href = "/members";
    });
  });
});
