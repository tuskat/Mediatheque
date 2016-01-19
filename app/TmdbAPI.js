
// -- CONSTRUCTOR --
//define(["dojo/request/script", "dojo/_base/declare"],function (script, declare)  {
  
  
 define([
   "dojo/request/script",
   "dojo/_base/declare",
   "dojo/Deferred"
  ], function(script, declare, Deferred){
  return declare(null, { 
 /*
  */
 // var tmdbAPI = declare(script, {   
  constructor: function(api_url, api_key){
       // declare.safeMixin(this,args);
       this.movies = "movie";
       this.series = "tv";
  
       this.key = api_key;
       this.url = api_url;
    },
//REQUESTS
 getTMDBJson : function(Url, arg, api_key)
{
//console.log(Url + arguments + "&api_key=" + api_key);
  return(script.get(Url + arg + "&api_key=" + api_key, {
    jsonp: "callback", 
  }).then(function(response){
    
      var data = {};
    
      data = response;
    //  console.dir(data);
      return(data);
    // Do something with the response data
    
  
    
  }, function(err){
    console.log("Error while getting the json, please check the query");
    return(null);
    // Handle the error condition
  }));
  
},
// -- Obsolete
 getTMDBPictureJson : function(Url, arg, api_key)
{
//console.log(Url + arguments + "?api_key=" + api_key);

 return(script.get(Url + arg + "?api_key=" + api_key, {
    jsonp: "callback", 
  }).then(function(response){
   
      var data = {};
    
      data = response;
     // console.dir(data);
      return(data);
    // Do something with the response data
  }, function(err){
    console.log("Error while getting the json, please check the query");
    return(null);
    // Handle the error condition
  }));
  

},
    
    
//MOVIES    

getMoviesById : function(movieId)
{
   var argument = "find/" + movieId + "?external_source=imdb_id";
   var result;
   
  
  result = this.getTMDBJson(this.url, argument, this.key);  
  return(result);
},


 searchMovie : function(toFind) {
 //search some movies
  var argument = "search/" + this.movies + "?query=" + "\"" + toFind + "\"";
  var result;
  
  result = this.getTMDBJson(this.url, argument, this.key);  
  return(result);
  }, 
 
 getMoviesByGenre : function(genre) {
    var argument = "genre/" + genre + "/" + this.movies;
    var result;
  
  result = this.getTMDBJson(this.url, argument, this.key);
  return(result);
},

getPopularMovies : function() {
    var argument = "discover/" + this.movies + "?sort_by=popularity.desc";
    var result;
  
  result = this.getTMDBJson(this.url, argument, this.key);
  //take all the popular movies
  return(result);
},

getRecentMovies : function() {
  Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   
   return yyyy +'-'+  (mm[1]?mm:"0" + mm[0])  +'-'+  (dd[1]?dd:"0" + dd[0]); // padding
  };

var d = new Date();
var now = d.yyyymmdd();

//console.log(now);

    var argument = "discover/" + this.movies + "?sort_by=release_date.desc&release_date.lte=" + now;
    var result;
  
  
  
  result = this.getTMDBJson(this.url, argument, this.key);
  return(result);
},
// TV SHOWS
 getPopularShows : function() {
    var argument = "discover/" + this.shows + "?sort_by=popularity.desc";
    var result;
  
  result = this.getTMDBJson(this.url, argument, this.key);
  return(result);
},
getRecentShows : function() {
    var argument = "discover/" + this.shows + "?sort_by=release_date.desc";
    var result;
  
     result = this.getTMDBJson(this.url, argument, this.key);
     return(result);
},
searchShow : function(toFind) {
  var argument = 'search/tv?query=' + toFind;
  var result;
  //search some shows
    result = this.getTMDBJson(this.url, argument, this.key);
    return(result);
},
// -- POSTER --

getPoster : function(mediaId, mediaType) {
    var argument = mediaType + "/" + mediaId + "/images";
    var result;
  
    result = this.getTMDBPictureJson(this.url, argument, this.key);
    return(result);
}

});
});
