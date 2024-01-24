

var customURL=window.location.protocol + "//" + window.location.host + window.location.pathname;
$("#input-url").val(customURL);
/* This function is used in the Onclick event of the copyURL button in the toolbar proxy, see toolbar_skin_blue*/
function copyURL() {
	/*un-hide the text field*/
	document.getElementById("input-url").setAttribute("type", "text");
  /* Get the text field */
  var copyText = document.getElementById("input-url");
  
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the document URL: " + copyText.value);
  document.getElementById("input-url").setAttribute("type", "hidden");
}


// -- Code to update copyright year to the current year in real time on docsite

var copyrightYear = document.getElementsByClassName("productvar.copyright")[0].textContent;//from 
var copyrightTag = document.getElementById("copyright-year");
var currentYear = new Date().getFullYear(); 
var isRange = copyrightYear.includes("-");

if(isRange){
  var copyYears = copyrightYear.split("-");
  copyrightTag.innerHTML = copyYears[0]+"-"+currentYear;
}
else {
  copyrightTag.innerHTML = currentYear;
}
