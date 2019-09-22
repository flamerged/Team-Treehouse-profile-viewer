//Problem = We want to dynamically view the badge count and JavaScript points through a browser for any given team treehouse user
//Solution = We will use Node.js to retrieve information for a given user and serve the information via HTTP to our website

//1. Create a webserver

const http = require('http');
const router = require('./router.js');

http.createServer(function(request, response) {
    router.home(request, response);
    router.user(request, response);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1/');
