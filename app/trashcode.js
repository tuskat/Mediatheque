       
             //   console.dir(popularMovies);          
              
              /*
                moviesI.then(function (successI) {
                console.dir(successI);   
                 buildMoviePoster(successI, success[0].results, partI);
             },
            function (fail) {

            });
                
                  moviesII.then(function (successII) {
           
            
                 buildMoviePoster(successII, success[1].results, partII);
             },
            function (fail) {

            }); 
                */
            //    buildMoviePoster(moviesI, results[0], partI);
            //    buildMoviePoster(moviesII, results[1], partII);
                
                //console.log(movies.length);
                 /*
                while (i != movies.length) {
                    
                    
                   
                    if (movies[i].posters.length != 0) {

                        var div = document.createElement("div");
                        var link = document.createElement("a");
                        var elem = document.createElement("img");

                        div.setAttribute("id", "poster" + i);
                        div.setAttribute("class", "poster");
                        link.setAttribute("onclick", "detailAssets(\"" + popularMoviesPromise.results[i].title + "\");");
                        elem.setAttribute("src", UrlImg + "w154/" + movies[i].posters[0].file_path + "?api_key=" + api_key);
                        link.appendChild(elem);
                        div.appendChild(link);

                        document.getElementById(part).appendChild(div);
                       // nb_poster++;

                    }
                    if (nb_poster == 13)
                        break;
                    i++;
                }


            });
*/

/*
var Url ="https://api.themoviedb.org/3/";

var api_key = "ac4cb421007b24e9ae363523b72adb5a";
*/
// Create a new class
/*
var Twitter = declare(null, {
    // The default username
    username: "defaultUser",
    propertyA: "Yes",
    propertyB: 2,
    // The constructor
    constructor: function(args){
        declare.safeMixin(this,args);
    }
});

define([
    "dojo/_base/declare",
    "dijit/form/Button"
], function(declare, Button){
    return declare("mynamespace.Button", Button, {
        label: "My Button",
        onClick: function(evt){
            console.log("I was clicked!");
            this.inherited(arguments);
        }
    });
});
*/

//tmdbAPI(api_key, api_url)


// -- MOVIES --

//tmdbAPI.prototype.
/*
tmdbAPI.prototype.getMoviesByGenre = function(genre) {
    var Argument = "/genre/"+genre+"/"+this.movies;
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
}
//
tmdbAPI.prototype.getPopularMovies = function() {
    var Argument = "/discover/"+this.movies+"?sort_by=popularity.desc";
    var Result;
  
  Result = getTMDBJson(this.url, Argument, this.key);
  //take all the popular movies
}
//
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
  var Argument = 'search/tv?query='+toFind;
  var Result;
  //search some shows
   Result = getTMDBJson(this.url, Argument, this.key);
}
// -- POSTER --

tmdbAPI.prototype.getPoster = function(mediaId, mediaType) {
    var Argument = mediaType+"/"+mediaId+"/images";
    var Result;
  
Result = getTMDBPictureJson(this.url, Argument, this.key);

}


// -- REQUEST FUNCION --
function getTMDBJson(Url, Arguments, api_key)
{
console.log(Url+Arguments+"&api_key="+api_key);
require(["dojo/request/script"], function(script){
  script.get(Url+Arguments+"&api_key="+api_key, {
    jsonp: "callback", 
  }).then(function(data){
    console.dir(data);
      return(data);
    // Do something with the response data
  }, function(err){
    console.log("Error while getting the json, please check the query");
    return(null);
    // Handle the error condition
  });
  
});

}
// -- Probably merge later --
function getTMDBPictureJson(Url, Arguments, api_key)
{
console.log(Url+Arguments+"?api_key="+api_key);

  script.get(Url+Arguments+"?api_key="+api_key, {
    jsonp: "callback", 
  }).then(function(data){
    console.dir(data);
      return(data);
    // Do something with the response data
  }, function(err){
    console.log("Error while getting the json, please check the query");
    return(null);
    // Handle the error condition
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


