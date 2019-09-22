//Problem = We want to dynamically view the badge count and JavaScript points through a browser for any given team treehouse user
//Solution = We will use Node.js to retrieve information for a given user and serve the information via HTTP to our website

//1. Create a webserver

var http = require("http");
http
  .createServer(function(request, response) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello World!");
    res.end();
  })
  .listen(1337, "127.0.0.1");
console.log("Server running at http://127.0.0.1/");

//2. Handle HTTP route GET / and POST / i.e. Home
function homeRoute() {
  //if url == "/" && GET
  //show search
  //if url == "/" & POST
  //redirect to /:username
}

//3. Handle HTTP route GET /:username i.e. /mersadajan
//if url == "/...."
//get json from Treehouse
//on "end"
//show profile
//on "error"
//show error

//4. Function that handles the reading of files and merge in value
//read from file and get a string
// merge values into string
