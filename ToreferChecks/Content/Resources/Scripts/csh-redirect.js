/**
 * This javascript loads on the page load. 
 * This file is called by the skin in the Madcap Flare project.
 * Purpose: The main purpose of this script is to provide redirection for context-sensitive help URLs.
 * These URL can be for the old DITA style of "?context=" parameters or new Flare style URLs "#cshid=".
 * Since, Flare doesn't support context id with periods (.) out-of-the-box, we need to use script to 
 * provide support for that.
 */

 function urlCapture (url) {
	var oldUrl = url;
	//console.log("Old URL: "+oldUrl);
	var context, baseUrl; 
	var contextIndex = url.indexOf("?context=");
	var cshidIndex = url.indexOf("#cshid=");
  
	if(contextIndex != -1){
	  /** Get the context ID from old style URLs which contains context with "?context=" separator instead of "#cshid=" */
	  //console.log("URL: "+url);
	  context=url.substring(contextIndex+9);
	  //console.log("Context ID: "+context);
  
	  /* Get the base URL by removing the query string and taking only part before the query*/
	  baseUrl = url.substring(0,contextIndex);
	  //console.log("Base URL: "+baseUrl);
	  
	}
	else if (cshidIndex != -1){
	  /** Get the context ID from flare style URLs which contains context with "#cshid="
	   * However, Madcap Flare already have a system in place for that but that doesn't work
	   * with context IDs with periods (.). 
	   */
	  
	  context=url.substring(cshidIndex+7);
	  //console.log("Context ID: "+context);
	  
	  /* Get the base URL by removing the hash string and taking only part before the hash value*/
	  baseUrl = oldUrl.toString().substring(0,cshidIndex);
	  //console.log("Base URL: "+baseUrl);
	}
	else{
	  return; // exit if context id is not found
	}
	
	/** set the path of the Alias.xml which contains the context ID mapping from the Flare project */
	var rootFolder = window.location.pathname;
	var aliasFile = 'Data/Alias.xml';
	var landingPage='Default.htm'; //this might be different if writer has chosen some other name in their HTML target file.
	var aliasFilePathFull= rootFolder.replace(landingPage,aliasFile);
	//console.log("Alias file path: " +aliasFilePathFull); 
	
   
	/**if there is an context ID in the URL then open the Alias.xml for XML parsing and looking up the target topic. 
	 * get the base URL from the existing URL and the append the linked topic found in the Alias.xml 
	 * redirect the page to the new URL
	 */
	if (context){
	  
	  /*Open the Alias.xml for XML parsing*/
		var xmlhttp = new XMLHttpRequest();
	  xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var redirectPage = lookUpCshTopic(this,context);
		//window.location=`${baseUrl}#${redirectPage}`
		if(redirectPage){
		  var updatedUrl = baseUrl + "#"+redirectPage;
		  window.location.replace(updatedUrl);
		}
	  }
	}
	xmlhttp.open("GET", aliasFilePathFull, true);
	xmlhttp.send();
	}  
  }
  
  /*The function that looks up the Alias.xml file for the Context ID and returns the topic path*/ 
  function lookUpCshTopic(xml,ctxid) {
	var x, i, xmlDoc, t;
	xmlDoc = xml.responseXML; //responseXML helps to parse the XML
	x = xmlDoc.getElementsByTagName("Map"); //retrieve the Map tag content in the responseXML object
  /** Loop through the responseXML object and compare each value of the attribute 'Map
   * with context ID and a match is found, return the value of the attribute 'Link'.
   */
	for (i = 0; i< x.length; i++) { //loop for each element of the Map tag
	  if (ctxid.toLowerCase()==x[i].getAttribute("Name").toLowerCase()){ 
		//console.log("Linked topic: "+x[i].getAttribute("Link"));
		return x[i].getAttribute("Link");
	  }    
	}
  return t;
  }
  
  urlCapture(window.location.href);