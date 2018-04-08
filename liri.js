require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

/***************************ARGUMENTS TAKEN IN FROM THE TERMINAL**************************************/
var command = process.argv[2];
var songName = process.argv[3];
var movieName = process.argv[3];

/***************************CONDITIONS**************************************/
if (command === "my-tweets") {
    my_Tweets();
}
else if (command === "spotify-this-song") {
    spotify_call();
}
else if (command === "movie-this") {
    movie_call();
}
else if (command === "do-what-it-says") {
    do_what_it_says();
}

/***************************FUNCTION FOR TWEETS**************************************/
function my_Tweets() {
    client.get('statuses/user_timeline', { count: 20 }, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                
                console.log("\n", i + 1);
                console.log("Tweet: ", tweets[i].text);
                console.log("Posted at: ", tweets[i].created_at);
            }
        }
        else {
            return console.log(error);
        }
    });
}

/***************************FUNCTION FOR SPOTIFY**************************************/
function spotify_call() {
    if (!songName) {
        spotify.search({ type: "album,track", query: "The Sign", limit: 5 }, function (err, data) {
            if (!err) {
                for (var i = 0; i < data.albums.items.length; i++) {
                    console.log("\nAlbum Name: ", data.albums.items[i].name);
                    console.log("Artist(s):");
                    for (var j = 0; j < data.albums.items[i].artists.length; j++) {
                        console.log(data.albums.items[i].artists[j].name);
                    }
                    console.log("External Link: ", data.albums.items[i].external_urls.spotify, "\n");
                }
            }
            else {
                return console.log('Error occurred: ' + err);
            }
        });
    }
    else {
        spotify.search({ type: "album,track", query: songName, limit: 5 }, function (err, data) {
            if (!err) {
                for (var i = 0; i < data.albums.items.length; i++) {
                    console.log("\Song Name: ", data.albums.items[i].name);
                    console.log("Artist(s):");
                    for (var j = 0; j < data.albums.items[i].artists.length; j++) {
                        console.log(data.albums.items[i].artists[j].name);
                    }
                    console.log("External Link: ", data.albums.items[i].external_urls.spotify, "\n");
                }
            }
            else {
                return console.log('Error occurred: ' + err);
            }
        });
    }
}

/************************************FUNCTION FOR MOVIES***************************************/
function movie_call(movieName) {
    request("http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy&tomatoes=true", function(error, response, body) {
        if(movieName === undefined) {
            return console.log("Please enter a movie name in quotes");
        }
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Score: " + JSON.parse(body).imdbRating);
            console.log("RT Score: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

/*******************************FUNCTION FOR TEXT INSIDE RANDOM.TXT**************************************/
function do_what_it_says() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            var dataArr = data.split(",");
            command = dataArr[0];
            songName = dataArr[1];
            if(command === "spotify-this-song"){
                spotify_call();
            }
        }
        else {
            return console.log(error);
        }
    });
}