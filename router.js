const Profile = require('./profile.js');

//2. Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    //if url == "/" && GET
    //show search
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('Header\n');
        response.write('Search \n');
        response.end('Footer\n');
    }
    //if url == "/" & POST
    //redirect to /:username
}

//3. Handle HTTP route GET /:username i.e. /mersadajan
function user(request, response) {
    /* //if url == "/...." */
    const username = request.url.replace('/', '');

    if (username.length > 0) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('Header\n');
        const studentProfile = new Profile(username);
        studentProfile.on('end', function(profileJSON) {
            const values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };
            response.write(values.javascriptPoints + ` JavaScript Points \n`);
            response.end('Footer\n');
        });
        studentProfile.on('error', error => {
            response.write(error.message);
            response.end('Error written.');
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
