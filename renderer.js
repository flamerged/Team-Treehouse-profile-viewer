const fs = require('fs');

//4. Function that handles the reading of files and merge in value

function mergeValues(values, content) {
    //cycle through all value keys and replace all {{key}} with the value from the values object
    for (let key in values) {
        content = content.replace('{{' + key + '}}', values[key]);
    }
    return content;
}

function view(templateName, values, response) {
    //read from the template files
    let fileContent = fs.readFileSync('./views/' + templateName + '.html', {
        encoding: 'utf8'
    });
    //insert values in to the content
    fileContent = mergeValues(values, fileContent);
    //Write out the respose
    response.write(fileContent);
}

module.exports.view = view;
