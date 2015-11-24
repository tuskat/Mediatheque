
function httpGetAsync(theUrl, )
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


require(["dojo/request/xhr", "dojo/dom", "dojo/dom-construct", "dojo/json", "dojo/on", "dojo/domReady!"],
function(xhr, dom, domConst, JSON, on){

 //   domConst.place("<p>Requesting...</p>", "output");

    xhr("http://api.themoviedb.org/3/discover/movie?api_key="+api_key, {
      handleAs: "json"
    }).then(function(data){
      console.log(data);
    });


});

  require(["dojo/store/JsonRest"], function(JsonRest){
  var store = new JsonRest({
    target: "https://api.themoviedb.org/3/discover/movie?api_key="+api_key
  });
//title ="title=Minions";
//api_key = "&api_key=ac4cb421007b24e9ae363523b72adb5a";
  // Get an object by identity
  store.get().then(function(item){
    console.log("voici le best of dude" + item);
    // item will be the DB item
  });

  // Query for objects with options
  store.query("&adult=true", {
    start: 10,
    count: 10
  }).then(function(results){
    console.log(results);
    // results should contain up to 10 items, sorted by "baz" in descending fashion
  });

  // Store an object identified by identity
 store.put({
    name: "Filth"
  }, {
    id: 3
  });

  // Remove an object by ID
  store.remove(3);

  });
  
  
    new Ajax.Request( Url, {
            method:  'get',
            parameters:  { 'api_key': api_key},
            onSuccess:  function(response){
    alert(response.responseText);
    },
    onFailure:  function(){
        alert('ERROR');
    }
});