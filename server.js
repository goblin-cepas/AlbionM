<<<<<<< HEAD
const express = require('express')
const fs = require('fs');
const path = require('path')
var app = express();
var request = require('request');
var server = require('http').Server(app);
var table = [];

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
    let tri = [];
    let affichage = [];
    let cities = JSON.parse(fs.readFileSync('City.json', 'utf8'));
    let items = JSON.parse(fs.readFileSync('IdItem.json', 'utf8'));
    for (var i in items.objet) {
        for (var c in cities.objet) {
            comRequest(items.objet[i].ID, cities.objet[c].city);
        }
    }
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    for (var i in items.objet) {
        for (var d in data) {
            if (data[d].item_id === items.objet[i].ID) {
                tri.push(data[d]);
                fs.writeFileSync('data.json', JSON.stringify(tri));
            }
        }
    }
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    for (var i in items.objet) {
        for (var d in data) {
            if (data[d].item_id === items.objet[i].ID) {
                let transfert = { "objet": data[d].item_id, "ville": data[d].city, "prix de vente HDV": data[d].sell_price_max, "prix d'achat HDV": data[d].buy_price_min };
                affichage.push(transfert);
            }
        }
        console.table(affichage);
        affichage = [];
    }
}

function comRequest(item, city) {
    request('https://www.albion-online-data.com/api/v1/stats/Prices/' + item + '?locations=' + city, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            if (result[0]) {
                table.push(result[0]);
            }
            fs.writeFileSync('data.json', JSON.stringify(table));
        }
        else {
            console.log("Error " + response.statusCode);
        }
    })
}

global();
console.log('listen on *:80');
=======
const express = require('express')
const fs = require('fs');
const path = require('path')
var app = express();
var request = require('request');
var server = require('http').Server(app);
var table = [];

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
    let tri = [];
    let affichage = [];
    let cities = JSON.parse(fs.readFileSync('City.json', 'utf8'));
    let items = JSON.parse(fs.readFileSync('IdItem.json', 'utf8'));
    for (var i in items.objet) {
        for (var c in cities.objet) {
            comRequest(items.objet[i].ID, cities.objet[c].city);
        }
    }
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    for (var i in items.objet) {
        for (var d in data) {
            if (data[d].item_id === items.objet[i].ID) {
                tri.push(data[d]);
                fs.writeFileSync('data.json', JSON.stringify(tri));
            }
        }
    }
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    for (var i in items.objet) {
        for (var d in data) {
            if (data[d].item_id === items.objet[i].ID) {
                let transfert = { "objet": data[d].item_id, "ville": data[d].city, "prix de vente HDV": data[d].sell_price_max, "prix d'achat HDV": data[d].buy_price_min };
                affichage.push(transfert);
            }
        }
        console.table(affichage);
        affichage = [];
    }
}

function comRequest(item, city) {
    request('https://www.albion-online-data.com/api/v1/stats/Prices/' + item + '?locations=' + city, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            if (result[0]) {
                table.push(result[0]);
            }
            fs.writeFileSync('data.json', JSON.stringify(table));
        }
        else {
            console.log("Error " + response.statusCode);
        }
    })
}

global();
console.log('listen on *:80');
>>>>>>> c9bb5ccb7cbf1582f4378abf932f92d64b22824e
server.listen(80);