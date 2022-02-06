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



$(document).ready(function () {
  const APIKEY = "61ffe45ef701f4600008970e";
  getContacts();
  $("#add-update-msg").hide();

  $("#contact-submit").on("click", function (e) {
    e.preventDefault();

    let contactName = $("#contact-name").val();
    let contactEmail = $("#contact-email").val();
    let contactNumber = $("#contact-number").val();
    let contactSubject = $("#contact-subject").val();
    let contactMessage = $("#contact-msg").val();

    let jsondata = {
      "name": contactName,
      "email": contactEmail,
      "number": contactNumber,
      "subject": contactSubject,
      "message": contactMessage
    };

    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactviedev-2215.restdb.io/rest/contactus",
      "method": "POST", 
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata),
      "beforeSend": function(){
        $("#contact-submit").prop("disabled", true);
        $("#add-contact-form").trigger("reset");
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      
      $("#contact-submit").prop( "disabled", false);

      $("#add-update-msg").show().fadeOut(3000);

      getContacts();
    });
  });
  
  function getContacts(limit = 10, all = true) {

    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactviedev-2215.restdb.io/rest/contactus",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
      },
    }

    $.ajax(settings).done(function (response) {
      
      let content = "";

      for (var i = 0; i < response.length && i < limit; i++) {

        content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
        <td>${response[i].email}</td>
        <td>${response[i].number}</td>
        <td>${response[i].subject}</td>
        <td>${response[i].message}</td>
        <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;

      }

      $("#total-contacts").html(response.length);
    });
  }
});