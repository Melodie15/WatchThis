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

  const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('genre');
$('#genreFilter').val(myParam);

const myParam2 = urlParams.get('service');
$('#serviceFilter').val(myParam2);

  $("#addItemForm").hide();
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

  $("#watch-list").on("click", ".delete-btn", function(event) {
    event.preventDefault();
    const id = $(this).data("id");
    console.log(id);
    $.post("/api/delete/" + id).then(() => {
      window.location.href = "/members";
    });
  });

  //listener for watched update
  $("#watch-list").on("click", ".watched-toggle", function(event) {
    console.log("entered change event");
    event.preventDefault();
    let bool = $this.prop("checked");
    console.log("bool= " + bool);
    bool = !bool;
    console.log("!bool= " + bool);
    const id = $(this).data("id");
    console.log("id = " + id);
  }); //end of toggle listener

  //listener for genre filter
  $(".container").on("change", "#genreFilter", function(event) {
    event.preventDefault();
    const genre = $("option:selected").val();
    console.log(genre, "Hello Filter");
    const url=setParam(window.location.search,'genre',$('#genreFilter').val());
    window.location.href='/members?'+url;
  });

  $(".container").on("change", "#serviceFilter", function(event) {
    event.preventDefault();
    const genre = $("option:selected").val();
    console.log(genre, "Hello Filter");
    const url=setParam(window.location.search,'service',$('#serviceFilter').val());
    window.location.href='/members?'+url;
  });

  function setParam(uri, key, val) {
    return uri
        .replace(RegExp("([?&]"+key+"(?=[=&#]|$)[^#&]*|(?=#|$))"), "&"+key+"="+encodeURIComponent(val))
        .replace(/^([^?&]+)&/, "$1?");
}
});
