includeHTML();

function includeHTML() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("script-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("script-html");
      var xhttp = new XMLHttpRequest();
      //The XMLHttpRequest object can be used to request data from a web server.
      xhttp.onreadystatechange = function () {
        //The onreadystatechange property specifies a function to be executed every time the
        //status of the XMLHttpRequest object changes:
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          //State 4 means that the request had been sent, the server had finished returning
          //the response and the browser had finished downloading the  response content.
          //status 200 means the request was fulfilled
          //i.e. the response is ready
          a.removeAttribute("script-html");
          a.innerHTML = xhttp.responseText;
          //The responseText property returns the server response as a text string, which is
          //used to update a web page:
          z[i].parentNode.replaceChild(a, z[i]);
          includeHTML();
        }
      };
      xhttp.open("GET", file, true); //initialize the Get request with the file name
      xhttp.send(); //send the request
      return;
    }
  }
}

//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
  //what kind of interface we want at the start 
  const APIKEY = "61d2937accd0211b32089568";
  getContacts();
  $("#add-update-msg").hide();

  //[STEP 1]: Create our submit form listener
  $("#contact-submit").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let contactName = $("#contact-name").val();
    let contactEmail = $("#contact-email").val();
    let contactNumber = $("#contact-number").val();
    let contactSubject = $("#contact-subject").val();
    let contactMessage = $("#contact-msg").val();

    //[STEP 3]: get form values when user clicks on send
    //Adapted from restdb api
    let jsondata = {
      "name": contactName,
      "email": contactEmail,
      "number": contactNumber,
      "subject": contactSubject,
      "message": contactMessage
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactviedev-2215.restdb.io/rest/contactus",
      "method": "POST", //[cher] we will use post to send info
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function(){
        //@TODO use loading bar instead
        //disable our button or show loading bar
        $("#contact-submit").prop( "disabled", true);
        //clear our form using the form id and triggering it's reset feature
        $("#add-contact-form").trigger("reset");
      }
    }

    //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
    $.ajax(settings).done(function (response) {
      console.log(response);
      
      $("#contact-submit").prop( "disabled", false);
      
      //@TODO update frontend UI 
      $("#add-update-msg").show().fadeOut(3000);

      //update our table 
      getContacts();
    });
  });//end click 
});