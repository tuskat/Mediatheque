// shift alt F to indent all 
var Url = "https://api.themoviedb.org/3/";
var UrlImg = "http://image.tmdb.org/t/p/";
var api_key = "ac4cb421007b24e9ae363523b72adb5a";
var searchState = 0;
var homePageLimit = 12;


require(["app/TmdbAPI",
    "dojo/promise/all",
    "dojo/domReady!"],
			 function (TmdbAPI, all) {
        var tmdb = new TmdbAPI(Url, api_key);

        var popularMoviesPromise = tmdb.getPopularMovies();

        popularMoviesPromise.then(function (success) {
            var partI = "popularMovies";
            getMoviesData(success.results, tmdb, partI, homePageLimit);

            return tmdb.getRecentMovies();
        }).then(function (success) {

            var partII = "recentMovies";
            //  console.dir(success);
            getMoviesData(success.results, tmdb, partII, homePageLimit);


        }).then(function () {
            $(".poster").removeClass("hided");
            $(".poster").addClass("fadeIn");
        });


    });

function detailAssets(Id) {

    require([
        "app/TmdbAPI"
    ],
        function (TmdbAPI) {

            var tmdbAPI = new TmdbAPI(Url, api_key);
            var details;

          
            details = tmdbAPI.getMoviesById(Id);
            details.then(function (success) {
                document.getElementById("popularMovies").style.display = 'none';
                document.getElementById("recentMovies").style.display = 'none';
                document.getElementById("searchMovies").style.display = 'none';
                document.getElementById("assetDetails").style.display = 'block';


                var myNode = document.getElementById("assetDetails");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                var movieData = success;

                var div = document.createElement("div");
                div.setAttribute("class", "bigPoster");

                var img = document.createElement("img");
                img.setAttribute("class", "img-responsive");
                img.setAttribute("src", UrlImg + "w342/" + movieData.poster_path + "?api_key=" + api_key);
                div.appendChild(img);

                var divAsset = document.createElement("div");
                divAsset.setAttribute("class", "assetInfos col-xs-12 co-md-6 animated fadeIn");

                var title = document.createElement("h2");
                title.innerHTML = movieData.title;
			
		       var infos = document.createElement("span");

                var d = new Date(movieData.release_date);

                var date = d.getDate();
                var month = d.getMonth() + 1; //Months are zero based

                var year = d.getFullYear();

                var before = "";
                var after = "/";

                if (date < 10)
                    before = "0";

                if (month < 10)
                    after = "/0";


                infos.innerHTML = "Genre : ";
                for (var i = 0; i != movieData.genres.length; i++) {
                    infos.innerHTML += movieData.genres[i].name;
                    if (i != (movieData.genres.length - 1))
                        infos.innerHTML += "/";
                }
                infos.innerHTML += "<br>Release date : ";
                infos.innerHTML += before + date + after + month + "/" + year + "<br>";

                var isSynopsis = false;
                var synopsis = document.createElement("span");
                synopsis.setAttribute("class", "synopsis col-xs-12 col-md-9 ");

                if (movieData.overview != null) {
                    if (movieData.overview.length > 2) {
                        synopsis.innerHTML = "<hr>" + movieData.overview;
                        isSynopsis = true;
                    }
                }
                if (isSynopsis == false)
                    synopsis.innerHTML = "<hr> no synopsis added yet.";

                divAsset.appendChild(title);
                divAsset.appendChild(infos);
                divAsset.appendChild(synopsis);

                var btnBar = document.createElement("div");
                btnBar.setAttribute("class", "col-xs-12 col-md-12");

                //          var btnTrailer = document.createElement("a");
                //			var btnMovie = document.createElement("a");
                var btnBack = document.createElement("a");

                //       btnTrailer.setAttribute("class", "btn btn-success detailsBtn");
                //		btnMovie.setAttribute("class", "green-sea-flat-button detailsBtn");
                btnBack.setAttribute("class", "btn btn-success detailsBtn");

                //           btnTrailer.setAttribute("href", "#trailer();");
                //			btnMovie.setAttribute("href", "#movie()");
                btnBack.setAttribute("onclick", "backToHub();");



                //   var ltrailer = document.createTextNode("Trailer");
                //	var lmovie = document.createTextNode("Watch Now");
                var lback = document.createTextNode("Back to Hub");

                //          btnTrailer.appendChild(ltrailer);
                //			btnMovie.appendChild(lmovie);
                btnBack.appendChild(lback);

                //            btnBar.appendChild(btnTrailer);
                //			  btnBar.appendChild(btnMovie);
                btnBar.appendChild(btnBack);


                divAsset.appendChild(btnBar);

                document.getElementById("assetDetails").appendChild(div);
                document.getElementById("assetDetails").appendChild(divAsset);


            },
                function (failure) {
                    console.log("error");
                });
        });
}
function exitSearch() {
    searchState = 0;
    backToHub();
}

function backToHub() {
    if (searchState == 0) {
        document.getElementById("popularMovies").style.display = 'block';
        document.getElementById("recentMovies").style.display = 'block';
        document.getElementById("searchMovies").style.display = 'none';
        document.getElementById("assetDetails").style.display = 'none';
    }
    else {
        document.getElementById("popularMovies").style.display = 'none';
        document.getElementById("recentMovies").style.display = 'none';
        document.getElementById("searchMovies").style.display = 'block';
        document.getElementById("assetDetails").style.display = 'none';
    }
}

function searchEnter(e) {
    if (e.keyCode == 13) {
        search();
    }
}
function search() {

    var container = document.getElementById("searchMovies");
    var elements = container.getElementsByClassName("poster");

    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    searchState = 1;
    require([
        "app/TmdbAPI",
        "dojo/promise/all"
    ],
        function (TmdbAPI, all) {
            var tmdb = new TmdbAPI(Url, api_key);


            var search = document.getElementById("assetSearch").value;
            var searchedMovies = tmdb.searchMovie(search);
            // console.log(search);
            //console.log(myNode.innerHTML);
            searchedMovies.then(function (success) {
                // -- Affichage Posters --//
                var part = "searchMovies";

                getMoviesData(success.results, tmdb, part);

                //<button class="btn btn-success" onclick="exitSearch()">Back</button>
                
                var element = document.getElementById("searchExit");
                if (element) {
                    element.outerHTML = "";
                    delete element;
                }
                var btn = document.createElement("btn");

                btn.setAttribute("id", "searchExit");
                btn.setAttribute("class", "btn btn-lg btn-primary animated fadeIn");

                btn.setAttribute("onclick", "exitSearch()");

                btn.innerHTML = "Back to Home";
                document.getElementById(part).innerHTML += "<br>";
                document.getElementById(part).appendChild(btn);


                document.getElementById("popularMovies").style.display = 'none';
                document.getElementById("recentMovies").style.display = 'none';
                document.getElementById("assetDetails").style.display = 'none';
                document.getElementById("searchMovies").style.display = 'block';

                //
            },
                function (fail) {

                }).then(function () {

                    $(".poster").removeClass("hided");
                    $(".poster").addClass("fadeIn");
                });
        });

}

function getMoviesData(success, tmdbAPI, part, limit) {
    require([
        "app/TmdbAPI",
        "dojo/promise/all"
    ],
        function (TmdbAPI, all) {

            if (limit === undefined)
                limit = -1;

            var nb_poster = 0;
            // ------ BEGINING FUNCTION ---- //
            for (var i = 0; i != success.length; i++) {



                if (success[i].poster_path) {
                    
                    //  console.dir(success[i]);
                    var div = document.createElement("div");
                    var link = document.createElement("a");
                    var elem = document.createElement("img");

                    div.setAttribute("id", "poster" + i);
                    div.setAttribute("class", "poster animated hided");

                    link.setAttribute("onclick", "detailAssets(\"" + success[i].id + "\");");

                    elem.setAttribute("class", "img-responsive");
                    elem.setAttribute("src", UrlImg + "w185/" + success[i].poster_path + "?api_key=" + api_key);
                    link.appendChild(elem);

                    div.appendChild(link);


                    document.getElementById(part).appendChild(div);
                    nb_poster++;
                    if (nb_poster == limit)
                        break;
                }

            }


        });



}

