$(document).ready(function () {
  const APIKEY = "61ffe45ef701f4600008970e";
  getContacts();

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

      getContacts();
    });
  });

});