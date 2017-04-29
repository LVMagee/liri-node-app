
// Varible storage
var request = require("request");
var fs = require("fs");
var action = process.argv[2];
var value = process.argv[3];
var twitter = require("twitter");
var spotify = require("spotify");
var keys = require("./keys.js");
var client = new twitter(keys.twitterKeys);
var params = {
	screen_name: "Dive_Zen",
	count: 20
}


// Switch function use case statments as callbacks
switch (action) {
	case "my-Tweets":
	myTweets();
	break;
	case "spotify-This":
	spotifyThis(value);
	break;
	case "movie-This":
	movieThis(value);
	break;
	case "do-Random":
	doRandom();
	break;
	default: "error-This"

}

// Tweets section NPM Module
function myTweets() {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error && response.statusCode == 200) {

			console.log(' ');
			console.log('Last 20 Tweets:')
			console.log(' ');
			for (i = 0; i < tweets.length; i++) {
                // var number = i + 1;
                var tweetResults =
                "Dive_Zen says: " + [i + 1] + '. ' + tweets[i].text + "\r\n" +
                "Created on: " + tweets[i].created_at + "\r\n" +
                "------------------------------------------------------------------" + "\r\n";
                console.log(tweetResults);
                log(tweetResults);
            }
        }
    });
} 

// Spotify section NPM Module
function spotifyThis(value) {
	if (value == null) {
		value = '"The Sign" by Ace of Base';
	}
	spotify.search({ type: "track", query: value }, function(err, data) {
		if(!err){
			var songInfo = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				if (songInfo[i] != undefined) {
					var spotifyResults =
					"Artist: " + songInfo[i].artists[0].name + "\r\n" +
					"Song: " + songInfo[i].name + "\r\n" +
					"Album the song is from: " + songInfo[i].album.name + "\r\n" +
					"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(spotifyResults);
					log(spotifyResults); 
				}
			}
		}	else {
			console.log("Problem :"+ err);
			return;
		}
	});
}

// Movie section API call back omdb
function movieThis(value) {
	if (value == null) {
		value = 'Mr. Nobody';
	}
	request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			movieObject = JSON.parse(body);
			var movieResults =
			"Title: " + movieObject.Title+"\r\n"+
			"Year: " + movieObject.Year+"\r\n"+
			"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
			"Country: " + movieObject.Country+"\r\n"+
			"Language: " + movieObject.Language+"\r\n"+
			"Plot: " + movieObject.Plot+"\r\n"+
			"Actors: " + movieObject.Actors+"\r\n"+
			"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
			"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
			"------------------------------ end ------------------------------" + "\r\n";
			console.log(movieResults);
			log(movieResults); 
		} else {
			console.log("Problem :"+ error);
			return;
		}
	});
}

// Random 
function doRandom() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) {
			console.log(error);
		} else {
			var dataArr = data.split(',');
			if (dataArr[0] === 'spotify') {
				spotifyThis(dataArr[1]);
			}
		}
	});
}

// Text logging function
function log(logResults) {
	fs.appendFile("log.txt", logResults, (error) => {
		if(error) {
			throw error;
		}
	});
}



