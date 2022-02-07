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
  
  /*
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
  }*/
});