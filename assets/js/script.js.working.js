//Setting Array
var gifys = ["Rick and Morty", "Bo Jack Horseman", "South Park", "The Simpsons", "Futurama", "Robot Chicken", "Brickleberry", "Drawn Together", "Dr. Katz", "Beavis and Butt-Head"];


function displayGifInfo(gifName) {

  //Global vars
  var gify = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gify + "&api_key=ED5M7CisPjLAtbyt9UiIJpQdgioBnDSz&limit=10";

  //AJAX `Get` to Giphy API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    console.log(queryURL);
    console.log(response);
    var gifyDiv = $("<div class='gify'>");
    // var rating = response.data.rating;
    var results = response.data;
    for (var i = 0; i < gifys.length; i++) {
      
      //Generating a div to hold the giphys
      var gifyDiv = $("<div>");

      //Storing rating response
      var rating = response.data.rating;

      //Generating <p> and rating rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      //Generating image tag
      var gify = $("<img>");
      
      //Defining src attribute of the images pulled
      gify.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and image tag to the <div>
      gifyDiv.append(gify);

      // Prependng to the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(gifyDiv);

      //<<<<<<<<<<<<<
      var pRate = $("<p>").text("Rating: " + rating);

      gifyDiv.append(pRate);

      // Retrieving the URL for the image
      var imgURL = response.rating;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      gifyDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#gify-view").prepend(gifyDiv);
    }
  });
};

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifys.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("gify");
    // Adding a data-attribute
    a.attr("data-name", gifys[i]);
    // Providing the initial button text
    a.text(gifys[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-gify").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gify = $("#gify-input").val().trim();

  // Adding movie from the textbox to our array
  gifys.push(gify);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".gify", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();