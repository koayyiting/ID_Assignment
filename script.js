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

