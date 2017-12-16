
      var gifys = ["Rick and Morty", "South Park", "Bo Jack Horseman", "The Simpsons"];

      
      function displayGifinfo(gifName) {

        var gify = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifys + "&api_key=dc6zaTOxFJmzC&limit=10";

        // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {   
          console.log(queryURL);
          console.log(response);
          var gifyDiv = $("<div class='gify'>");
          var rating = response.data.rating;
          var results = response.data; 
          for (var i = 0; i < gifys.length; i++) {
    //>>>>>>>>>>>>>>>>
          // Creating and storing a div tag
          var gifyDiv = $("<div>");
          
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var gify = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          gify.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          //gifyDiv.append(p);
          gifyDiv.append(gify);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
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
      $("#add-gify").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gify = $("#gify-input").val().trim();

        // Adding movie from the textbox to our array
        gifys.push(gify);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
     $(document).on("click", ".gify", displayGifinfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();