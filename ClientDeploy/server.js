//var http = require('http');
//var fs = require('fs');

//const PORT = 8080;

//fs.readFile('./userEntry.html', function (err, html) {

//    if (err) throw err;

//    http.createServer(function (request, response) {
//        response.writeHeader(200, { "Content-Type": "text/html" });
//        response.write(html);
//        response.end();
//    }).listen(PORT);
//});
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen('3000');
console.log('working on 3000');