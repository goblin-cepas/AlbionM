const express = require('express')
const fs = require('fs');
const path = require('path')
var app = express();
var request = require('request');
var server = require('http').Server(app);

// fonction de base qui permet d'ajouter des chemins sur un site web
/*
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
*/

function global() {
    let cities = JSON.parse(fs.readFileSync('City.json', 'utf8'));
    let items = JSON.parse(fs.readFileSync('IdItem.json', 'utf8'));
    console.log(items.objet);
    for (var i in items.objet) {
        for( var c in cities.objet){
            comRequest(items.objet[i].ID, cities.objet[c].city);
        }
    }
}

function comRequest(item, city) {
    request('https://www.albion-online-data.com/api/v1/stats/Prices/' + item + '?locations=' + city, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            console.log("Error " + response.statusCode);
        }
    })
}

global();

console.log('listen on *:80');
server.listen(80);