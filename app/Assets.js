define(["dojo/_base/declare", "app/Assets"], function(declare, Assets){
  return declare(null, {

//declare("app.Assets", null, {

id : "",
title : "",
year : "",
length : "",
synopsis : "",
poster : "",	

constructor : function(args)
{
	declare.safeMixin(this,args);
}	
});


declare("app.Movies", Assets, {
//what the hell I'm supposed to add in this one?	
	
});

declare("app.Tv", Assets, {
	
list_episodes : "",
synopsis_episodes : {}
	
});

});