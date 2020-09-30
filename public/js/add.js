// The code in add.js handles what happens when the user clicks the "Add a movie" button.

// When user clicks submit-btn
$("#submit-btn").on("click", function(event) {
    event.preventDefault();
  
    // Make a newMovie object
    var newMovie = {
      title: $("#title").val().trim(),
      genre: $("#genre").val(),
      service: $("#service").val()
    };
  
    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newMovie)
      // On success, run the following code
      .then(function(data) {
        // Log the data we found
        console.log(data);
      });
  
    // Empty each input box by replacing the value with an empty string
    $("#title").val("");
  });