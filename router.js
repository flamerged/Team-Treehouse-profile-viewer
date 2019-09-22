const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const commonHeader = { 'Content-Type': 'text/html' };

//2. Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    //if url == "/" && GET
    //show search
    if (request.url === '/') {
        response.writeHead(200, commonHeader);
        renderer.view('header', {}, response);
        renderer.view('search', {}, response);
        renderer.view('footer', {}, response);
        response.end('');
    }
    //if url == "/" & POST
    //redirect to /:username
}

//3. Handle HTTP route GET /:username i.e. /mersadajan
function user(request, response) {
    /* //if url == "/...." */
    const username = request.url.replace('/', '');

    if (username.length > 0) {
        response.writeHead(200, commonHeader);
        renderer.view('header', {}, response);
        const studentProfile = new Profile(username);
        studentProfile.on('end', function(profileJSON) {
            const values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };
            renderer.view('profile', values, response);
            renderer.view('footer', {}, response);
            response.end();
        });
        studentProfile.on('error', error => {
            renderer.view('error', { errorMessage: error.message }, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }
    /*
    //get json from Treehouse
        //on "end"
            //show profile
        //on "error"
            //show error */
}
module.exports.user = user;
module.exports.home = home;
