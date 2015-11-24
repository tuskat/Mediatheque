	
	var Url ="https://api.themoviedb.org/3/";
	var UrlImg = "http://image.tmdb.org/t/p/";
    var api_key = "ac4cb421007b24e9ae363523b72adb5a"; 
	
	
	
	require(["dojo/domReady!"],
	function(){
	
	require([	
		"app/TmdbAPI"	
		],
		 function(TmdbAPI){
  	var tmdbAPI = new TmdbAPI(Url, api_key);
  
  	var popularMovies = tmdbAPI.getPopularMovies(); // 3600, 20
	var recentMovies = tmdbAPI.getRecentMovies();
	//var test = tmdbAPI.searchMovie("filth");
	
	popularMovies.then(function(success){
		// -- Affichage Posters --//
	var part = "popularMovies";
		 for(var i = 0; i <= 13; i++)
		 {
			var id = 0;
			var data = success;
			
			var movie = tmdbAPI.getPoster(success.results[i].id, "movie");
			movie.then(function(success){
				
				//console.dir(success);
			
			var div = document.createElement("div");
			div.setAttribute("id", "poster"+id);
			div.setAttribute("class", "poster");
			
			var link = document.createElement("a");
			link.setAttribute("onclick", "detailAssets(\""+data.results[id].title+"\");");
			
			var elem =  document.createElement("img");
		  	elem.setAttribute("src", UrlImg+"original/"+success.posters[0].file_path+"?api_key="+api_key);	  
		  	
			  link.appendChild(elem);
			  div.appendChild(link);
			  
			document.getElementById(part).appendChild(div);
			id++;
		 	},
			function (fail){
			
			});
			
		 }
	//
	},
	 function(fail){
		 
	 });  
	  
	 recentMovies.then(function (success){
		 // -- Affichage Posters --//
	var part = "recentMovies";
		
		 for(var i = 0; i <= success.results.length; i++)
		 {
		
			 if (typeof success.results !=='undefined')
			 {
				 
			 var added = 0;
			 var id2 = 0;
			var data = success;
			
			var movie = tmdbAPI.getPoster(success.results[i].id, "movie");
			movie.then(function(success){
		
			if(typeof success.posters !== 'undefined' )
			{		
			if(typeof success.posters[0].file_path !== 'undefined' )
				{
					var div = document.createElement("div");
			div.setAttribute("id", "poster"+(id2));
			div.setAttribute("class", "poster");
			
			var link = document.createElement("a");
			link.setAttribute("onclick",  "detailAssets(\""+data.results[id2].title+"\");");
				var elem =  document.createElement("img");
		  		elem.setAttribute("src", UrlImg+"original/"+success.posters[0].file_path+"?api_key="+api_key);	  
		  	 link.appendChild(elem);
			  div.appendChild(link);
			  
			document.getElementById(part).appendChild(div);
			added++;  	
			}
				  
			 
			
				}
				id2++;	
		 	},
			function (fail){
			
			});
			if (added == 14)
				break;
		 }
		 }
	//
		// insertPoster(success, "recentMovies");			
	  },	  
	  function(failure) {
		console.log("error");  
	  })
	});
	 
	 });
	 // Insert a poster
//	 require(["dojo/domReady!"],

	function detailAssets(Id)
	{
		
		require([	
		"app/TmdbAPI"	
		],
		 function(TmdbAPI){
		
		var tmdbAPI = new TmdbAPI(Url, api_key);
		var details;
		
		details = tmdbAPI.searchMovie(Id);
		details.then(function (success){
		console.dir(success);
		document.getElementById("popularMovies").style.display = 'none';
    	document.getElementById("recentMovies").style.display = 'none';
		document.getElementById("assetDetails").style.display = 'block';
		
		
		var myNode = document.getElementById("assetDetails");
		while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
		}
		
		var movieData = success;
		
			var movie = tmdbAPI.getPoster(success.results[0].id, "movie");
			movie.then(function(success){
		
		console.dir(movieData);
			var div = document.createElement("div");
			//div.setAttribute("id", "poster");
			div.setAttribute("class", "bigPoster");
			
			var img = document.createElement("img");
			img.setAttribute("class", "picture");
			img.setAttribute("src", UrlImg+"original/"+success.posters[0].file_path+"?api_key="+api_key);	 
		
			div.appendChild(img);
		
			var divAsset = document.createElement("div");
			divAsset.setAttribute("class","assetInfos")
			
			
			
			var title = document.createElement("h2");
			title.innerHTML = movieData.results[0].title;
			
			
			//title = document.innerHTML(movieData.results[0].title);
			
			var infos = document.createElement("span");
			
			
   var d = new Date(movieData.results[0].release_date);
   
var date = d.getDate();
var month = d.getMonth() + 1; //Months are zero based

var year = d.getFullYear();

var before = "";
var after = "/";

if(date <10)
before = "0";

if (month < 10)
after = "/0";	

infos.innerHTML = before + date + after + month + "/" +year +"<br>";

			
			var synopsis = document.createElement("span");
			synopsis.setAttribute("class", "synopsis");
			synopsis.innerHTML = "<hr>"+movieData.results[0].overview;
			
			
			divAsset.appendChild(title);
			divAsset.appendChild(infos);
			divAsset.appendChild(synopsis);
			
			var btnBar = document.createElement("div");
			btnBar.setAttribute("class", "button-bar");
			
			var btnTrailer = document.createElement("a");
			var btnMovie = document.createElement("a");
			var btnBack = document.createElement("a");
			
			btnTrailer.setAttribute("class", "green-sea-flat-button detailsBtn");
			btnMovie.setAttribute("class", "green-sea-flat-button detailsBtn");
			btnBack.setAttribute("class", "green-sea-flat-button detailsBtn");
			
			btnTrailer.setAttribute("href", "#trailer();");
			btnMovie.setAttribute("href", "#movie()");
			btnBack.setAttribute("onclick", "backToHub();");
			
			
			
			var ltrailer = document.createTextNode("Trailer");
			var lmovie = document.createTextNode("Watch Now");
			var lback = document.createTextNode("Back to Hub");
			
			btnTrailer.appendChild(ltrailer);
			btnMovie.appendChild(lmovie);
			btnBack.appendChild(lback);
			
			btnBar.appendChild(btnTrailer);
			btnBar.appendChild(btnMovie);
			btnBar.appendChild(btnBack);
			
			
			divAsset.appendChild(btnBar);
			
			document.getElementById("assetDetails").appendChild(div);
			document.getElementById("assetDetails").appendChild(divAsset);
			},
			function (fail){
			
			});
			
		},
		 function(failure) {
		console.log("error");  
	  });
		
		//console.log(Id);
	});
	}
	
	function backToHub()
	{
		document.getElementById("popularMovies").style.display = 'block';
    	document.getElementById("recentMovies").style.display = 'block';
		document.getElementById("assetDetails").style.display = 'none';
	}

		/* 	<!--
			<div class="bigPoster">
			 <img class="picture" src="images/poster.jpg" alt="Some poster"  ismap>
			</div>
			<div class="assetInfos">
			<h2>Title</h2>
				<span>Year - Length - Genres</span><br>
			<hr>
			<span class="synopsis">blablabla</span>
	
				<div class="button-bar">
					<a  href="#hub.html"><button class="btn2">Trailer</button></a>
					<a  href="#hub.html"><button class="btn2">Watch the damn thing</button></a>
					<a  href="hub.html"><button class="btn2">Back</button></a>
				</div>
			</div>
		-->*/
		
		