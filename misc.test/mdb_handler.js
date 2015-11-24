/*
var Url ="https://api.themoviedb.org/3/";

var api_key = "ac4cb421007b24e9ae363523b72adb5a";
*/
// -- CONSTRUCTOR --

function tmdbAPI(api_key, api_url) {
  this.key = api_key;
  this.url = api_url;
  this.movies = "movie";
  this.series = "tv";
}

// -- MOVIES --

tmdbAPI.prototype.getSpecificMovies = function(toFind) {
  //search some movies
}

tmdbAPI.prototype.getMoviesByGenre = function(genre) {
    var Argument = "/genre/"+genre+"/"+this.movies;
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
}

tmdbAPI.prototype.getPopularMovies = function() {
    var Argument = "/discover/"+this.movies+"?sort_by=popularity.desc";
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
  //take all the popular movies
}

tmdbAPI.prototype.getRecentMovies = function() {
    var Argument = "/discover/"+this.movies+"?sort_by=release_date.desc";
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
}
// -- SHOWS --

tmdbAPI.prototype.getPopularShows = function() {
    var Argument = "/discover/"+this.shows+"?sort_by=popularity.desc";
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
}

tmdbAPI.prototype.getRecentShows = function() {
    var Argument = "/discover/"+this.shows+"?sort_by=release_date.desc";
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
}

tmdbAPI.prototype.searchShow = function(toFind) {
  //search some shows
}
// -- POSTER --

tmdbAPI.prototype.getPoster = function(mediaId, mediaType) {
    var Argument = this.url+mediaType+"/"+mediaId+"/images";
    var Result;
  
Result = getTMDBJson(this.url, Argument, this.key);

}


// -- REQUEST FUNCION --
function getTMDBJson(Url, Arguments, api_key)
{
console.log(Url+Arguments+"&api_key="+api_key);
require(["dojo/request/script"], function(script){
  script.get(Url+Arguments+"&api_key="+api_key, {
    jsonp: "callback", 
  }).then(function(data){
      return(data);
    // Do something with the response data
  }, function(err){
    return(null);
    // Handle the error condition
  });
  
});

}
/*
(function() {
  var omdbAPI = "http://www.omdbapi.com/?";
  $.getJSON( omdbAPI, {
    type: movietype
  
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        alert('un passage');      
        }
      });
    });
})();
*/


