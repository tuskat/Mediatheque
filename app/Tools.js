

function alignMoviesPoster(success, tmdbAPI, part)
{
    var arraymovie = [];
    
// ------ BEGINING FUNCTION ---- //
	for(var i = 0; (i != success.results.length); i++)
   	 {	
			var data = success;
			var movie = tmdbAPI.getPoster(success.results[i].id, "movie");           
            
            
            arraymovie.push(movie);
            /*
			movie.then(function(id, success){
				
			if(success.posters[0].file_path)
            {
				//console.dir(success);
			
			var div = document.createElement("div");
			var link = document.createElement("a");
            var elem =  document.createElement("img");
              	
            div.setAttribute("id", "poster"+id);
			div.setAttribute("class", "poster");
            link.setAttribute("onclick", "detailAssets(\""+data.results[id].title+"\");");     
		    elem.setAttribute("src", UrlImg+"w154/"+success.posters[0].file_path+"?api_key="+api_key);	  	
			link.appendChild(elem);
			div.appendChild(link);
			  
			document.getElementById(part).appendChild(div);
         //   nb_poster++;
            }
		 }.bind(null, i),             
			function (fail){
			
			});
         /*   if (document.getElementById(part).length === 13)
             break;*/
         	
	   }


       all(arraymovie).then(function(movies){
           console.log("bleh");
           console.log(movies);
       })

       
	// ---- END ----
}
