const express = require('express')
const fs = require('fs');
const path = require('path')
var app = express();

var server = require('http').Server(app);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
    console.log(request.url);
    loadPage('table', response);
});

function loadPage(page, response) {
    response.write(fs.readFileSync(page + '.html', 'utf-8'));
    response.end();
    console.log("Access to " + page);
}

console.log('listen on *:80');
server.listen(80);