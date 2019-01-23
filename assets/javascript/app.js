//The ready event occurs when the DOM (document object model) has been loaded.
//The ready() method specifies what happens when a ready event occurs.
$(document).ready(function () {

    // Create an array of strings,  Save array to a variable called topics. 
    var topics = ["Jedi Mind Trick", "Dance Party", "Shock", "Donald Trump", "Pusheen", "RHOA", "Food", "Weird", "Stupid", "Flirting", "Trending", "Sports"];

    //Create function creates all gif buttons in HTML for all topics in the array.
    function displayGifButtons() {

        // erasing div id contents to avoid duplicate results
        $("#gifButtonsView").empty();

        //Try using a loop that appends a button for each string in the array.
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("topic");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new button
    function addNewButton() {
        $("#addGif").on("click", function () {
            var topic = $("#topic-input").val().trim();
            if (topic == "") {
                return false; // added so user cannot add a blank button
            }
            topics.push(topic);

            displayGifButtons();
            return false;
        });
    }
    // Function to remove last button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
    function removeLastButton() {
        $("removeGif").on("click", function () {
            topics.pop(topic);
            displayGifButtons();
            return false;
        });
    }

    //Constructing a queryURL using the animal name. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    function displayGifs() {
        var topic = $(this).attr("data-name");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=f7N6XQNs9f2ve8HSbQVzXrWny0N8neHw&limit=10";
        console.log(queryURL); // displays the constructed url

        // Performing an AJAX request with the queryURL 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                console.log(response); // console test to make sure something returns
                $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click

                var results = response.data; //shows results of gifs
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); //div for the gifs to go inside
                    gifDiv.addClass("gifDiv");

                    // pulling rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);

                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                    // still image stored into src of image
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                    // still image
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);

                    // animated image
                    gifImage.attr("data-state", "still");

                    // set the image state
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    // pulling still image of gif
                    // adding div of gifs to gifsView div
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();

    // Document Event Listeners
    $(document).on("click", ".topic", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});

//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.


        //Under every gif, display its rating (PG, G, so on).
        //This data is provided by the GIPHY API.
        //Only once you get images displaying with button presses should you move on to the next step.


        //Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

//***BONUS***/
//Ensure your app is fully mobile responsive.