// Make a get request to our api route that will return every movie/show entry
$.get("/api/all", function(data) {
    // For each movie that our server sends us back
    for (var i = 0; i < data.length; i++) {
      // Create a parent div to hold movie data
      var listSection = $("<div>");
      // Add a class to this div: 'list'
      listSection.addClass("list");
      // Add an id to the list to mark which list it is
      listSection.attr("id", "movie-list-" + i);
      // Append the list to the list section
      $("#list-section").append(listSection);
  
      // Now we add our movie data to the list we just placed on the page
      $("#list-section-" + i).append("<h2>" + (i + 1) + ". " + data[i].title + "</h2>");
      $("#list-section-" + i).append("<h3>Genre: " + data[i].genre + "</h4>");
      $("#list-section-" + i).append("<h3>Service: " + data[i].service + "</h4>");
    }
  });