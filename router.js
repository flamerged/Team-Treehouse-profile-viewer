const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const commonHeader = { 'Content-Type': 'text/html' };
const querystring = require('querystring');

//2. Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    //if url == "/" && GET
    //show search
    if (request.url === '/') {
        if (request.method.toLowerCase() === 'get') {
            response.writeHead(200, commonHeader);
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        } else {
            //if url == "/" & POST
            //get post data from body
            request.on('data', function(postBody) {
                const body = postBody.toString();
                //extract the username
                const query = querystring.parse(body);
                response.writeHead(303, { location: '/' + query.username });
                response.end();
            });

            //redirect to /:username
        }
    }
}

//3. Handle HTTP route GET /:username i.e. /mersadajan
function user(request, response) {
    /* //if url == "/...." */
    const username = request.url.replace('/', '');

    if (username.length > 0) {
        response.writeHead(200, commonHeader);
        renderer.view('header', {}, response);
        const studentProfile = new Profile(username);
        //get json from Treehouse
        studentProfile.on('end', function(profileJSON) {
            const values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };
            /*on "end"
                //show profile*/
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });
        /*on "error"
            //show error */
        studentProfile.on('error', error => {
            renderer.view('error', { errorMessage: error.message }, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }
}
module.exports.user = user;
module.exports.home = home;
