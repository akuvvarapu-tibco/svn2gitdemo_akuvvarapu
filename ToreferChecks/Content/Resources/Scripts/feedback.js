
var docset = document.getElementsByClassName("productvar.productName")[0].textContent + " " + document.getElementsByClassName("productvar.productVersion")[0].textContent;
var pageTitle = document.getElementsByClassName("productvar.productName")[0].textContent + " " + document.getElementsByClassName("productvar.productVersion")[0].textContent + " - " + document.title;

let docURL = `${window.location.protocol}//${window.location.hostname}${window.location.pathname}${window.location.hash}`;
const baseURL = window.location.origin;
docURL=window.location.href;
$(document).ready(function(){
  
   hideEl("commentsRequired");
   document.querySelector("#option1").addEventListener("change", function() {
      document.getElementById("option1").disabled = false;
      hideEl("commentsRequired");
   });
   document.querySelector("#option2").addEventListener("change", function() {
      document.getElementById("option2").disabled = false;
      hideEl("commentsRequired");
   });
   document.querySelector("#option3").addEventListener("change", function() {
      document.getElementById("option3").disabled = false;
      hideEl("commentsRequired");
   });
   document.querySelector("#myTextarea").addEventListener("click", function() {
      hideEl("commentsRequired");
   });

   /* -------------- Feedback -------------- */
   /* Yes click */
   $('.feedback-yes').click(function() {
      /* fade out question, fade in thankyou message */
      $('.feedback-question').fadeOut(function() {
         $('.feedback-reason.yes-thanks').fadeIn();
         if(window.innerWidth<1060){
            scrollDownFunction();
         
         } else {
            scrollUpFunction();
         }
            document.getElementById("feedback-survey").style.position = "initial";
      });
     
      ga('t.send', 'event', 'Feedback - Yes', docset, document.title);
      var options= [];
      let comments = "Positive (Yes)";

      options[0] = "None";
      let formData = { options, comments, docURL };
       postData(formData);
   });
   /* No click */
   $('.feedback-no').click(function() {
      /* fade out question, fade in thankyou message */
      $('.feedback-question').fadeOut(function() {
         $('.feedback-reason.no').fadeIn();
         if(window.innerWidth<1060){
            scrollDownFunction();
         
         } else {
            scrollUpFunction();
         }
         document.getElementById("feedback-survey").style.position = "initial";
         ga('t.send', 'event', 'Feedback - No', docset, document.title);
      });					
   });
   
   function scrollUpFunction()
   {     
      $('html, body').animate({ scrollTop: 140 }, "smooth");
      $('html, documentElement').animate({ scrollTop: 140}, "smooth");
      $('#mc-main-content').animate({ scrollTop: 140}, "smooth");
   }
   function scrollDownFunction()
   {     
      $('html, body').animate({ scrollTop: document.body.scrollHeight }, "smooth");
      $('html, documentElement').animate({ scrollTop: document.body.scrollHeight}, "smooth");
      $('#mc-main-content').animate({ scrollTop: document.body.scrollHeight }, "smooth");
   }
});   

function showEl(id) {
    document.getElementById(id).style.color = (id === "feedbacktext") ? "green" : "red";
    document.getElementById(id).style.display = "block";
}

function hideEl(id) {
    document.getElementById(id).style.display = "none";
}

async function postData ( formData ) {
   const response = await fetch(`${baseURL}/api/doc-feedback`,
   {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData),
   });
   response.json().then(function (data){
       hideEl("form1");
       hideEl("feedback-no-heading");
       if(data.Success) {
           return $('.feedback-reason.yes-thanks').fadeIn();
           /*return showEl("feedbacktext");*/
       }
       showEl("feedbackError2");
   }).catch(function (err) {
       console.error("Error in posting", err);
       showEl("feedbackError");
   })
}

async function sendOtherFeedback() {
   var data = new FormData(form1);
   const option1 = data.get("option1");
   const option2 = data.get("option2");
   const option3 = data.get("option3");
   var comments = data.get("comments");
  
   if (option1 || option2 || option3 || comments) {
      var options = [];
      var i=0;
      for (const [name,value] of data) {
         if (value !== "") {
            options = [...options, value];
         }
         i++;
      }
      
      if (option1) {
         ga('t.send', 'event', 'Feedback Comment', option1, pageTitle);
      }
      if (option2) {
         ga('t.send', 'event', 'Feedback Comment', option2, pageTitle);
      }
      if (option3) {
         ga('t.send', 'event', 'Feedback Comment', option3, pageTitle);
      }
      if (comments) {
         ga('t.send', 'event', 'Feedback Comment', comments, pageTitle);
      }
      /*comments = comments.length == 0 ? "No additional comments" : comments;
      comments = "Type of feedback: Negative (No) - \n"+ comments;*/
      comments = "Negative (No)";
      let formData = {options, comments, docURL };
      await postData(formData);
   } 
   else {
       showEl("commentsRequired");
   }
}

async function skipFeedback(){
   var options= [];
   let comments = "Negative (No)";
   options[0] = "None";
   let formData = { options, comments, docURL };
   await postData(formData);
}