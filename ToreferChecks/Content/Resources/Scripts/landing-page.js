var VersionName = document.getElementsByClassName("productvar.productName")[0].textContent;//from 
var VersionNo = document.getElementsByClassName("productvar.productVersion")[0].textContent;//"6.2.2" //writer
var temp = VersionName.replace(/\//gi, ' ');
var slugArray = temp.replace(/[^\w\s]/gi, '').toLocaleLowerCase().trim().split(" ");
var slugName = "";
slugArray.forEach(joinSlug);
slugName=slugName.substring(0, slugName.length-1);

var slugNo = VersionNo.trim().split(".").join("-");
var finalSlug = `${slugName}-${slugNo}`;
var baseUrl = window.location.href.split("doc/html");
var defaultUrl = baseUrl[0]+"doc/html/Default.htm";
//var defaultUrl = baseUrl[0] + "doc/html1/index.html";

var downloadZipUrl = baseUrl[0] + finalSlug + "_documentation.zip";

var mostVisitedDivTag = document.getElementById("dropDownMostVisitedDiv");
var unorderedList = document.getElementById("mostVisitedUl");
var selectTag = document.getElementById("versionDropDown");
var defaultVersionTag = document.getElementById("default_versionNo");
var redirectTag = document.getElementById("redirect");
var surveyTag = document.getElementById("surveyLink");
var downloadTag = document.getElementById("downloadZip");

//initially set display to none
mostVisitedDivTag.style.display = "none";
selectTag.style.display = "none";

let docURL = `${window.location.protocol}//${window.location.hostname}`;
let apiUrl = '/api/webhelp_components/';

//set redirect to documentation url
redirectTag.innerHTML = `<p><a target="_blank" href="${docURL}/products/${finalSlug}?redirect=false" title="Go back to the ${VersionName} ${VersionNo} homepage in docs.tibco.com.">Classic Homepage</a></p>`  ;

//set download link
downloadTag.innerHTML = `<a target="_blank" href="${downloadZipUrl}" title="Download documentation of this version in a ZIP file for the offline use.">Download Help</a>`;


// set doumentation survey link
surveyTag.innerHTML = `<p><a target="_blank" href="${docURL}/feedback/${finalSlug}?redirect=false" title="Participate in the survey for the ${VersionName} ${VersionNo} documentation.">Participate in Documentation Survey</a></p>`;



apiUrl = docURL + apiUrl + finalSlug;
let productIndex = 0;
fetch(apiUrl).then(function (response) {
return response.json();
}).then(function ({ result }) {
// Work with JSON data here
data = result.data;
currentVersion = data.versionID;
//version drop down
data.versions.forEach(function (each, index) {

selectTag.style.display = "inline-block";
defaultVersionTag.style.display = "none";
var option = document.createElement("option"); //Create a <option> node
option.setAttribute("class", "mc-variable productvar.productVersion variable");
option.setAttribute("value", `${docURL}/products/${each.slug}`);
//option.style.cssText = 'background-color:hsla(204, 100%, 40%, 0.4)'
if (currentVersion == each.id) {
option.setAttribute("selected", true);
productIndex = index;
}
option.text = each.versionNumbers;
selectTag.add(option);
})
//check for archives
if (data.publishedArchives) {
var option = document.createElement("option"); //Create a <option> node
option.setAttribute("class", "mc-variable productvar.productVersion variable");
option.setAttribute("value", `${docURL}/products/${data.parentSlug}/archive`);
option.style.cssText = 'background-color:hsla(204, 100%, 40%, 0.4)';
option.text = "Other Versions";
selectTag.add(option);
}
//most visited
data.googleData.forEach(function (each) {
        var li = document.createElement("li"); // Create a <li> node
        console.log("I am inside most visited function");
        console.log("each[0]  - " + each[0] );
        console.log("apiURL - " + apiUrl);
        console.log(data.googleData.length);
        //var topicSlug= each[0].split('doc/html/');
        //var topicUrl = defaultUrl + '#' + topicSlug[1];
        li.innerHTML = `<p><a target="_blank" href="${docURL + each[0]}">${each[1]}</a></p>`
                unorderedList.appendChild(li)

    })
    if (data.googleData.length > 0) {
    mostVisitedDivTag.style.display = "block";
    }
}).catch(function (err) {
// Do something for an error here
});
//onchange of dropdown - open the selected version in new tab
function changeFunc(selectedValue) {
selectTag.selectedIndex = productIndex;
window.open(selectedValue, '_blank');
}

//function to join the product and removing any empty values
function joinSlug(item){
        if (item != "")
        {
    	        slugName=slugName.concat(item.concat("-"));
        }
}
