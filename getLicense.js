const http = require('http');
var licUser;
var licenceNumber = 0;

http.get('http://localhost:5251/LicenseHandler', res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        console.log('Response ended: ');
        //const licusers = JSON.parse(Buffer.concat(data).toString());

        //for (lic of licUser) {
        //    console.log("licenseNumber = ${lic.licenseNumber}, clientName = ${lic.clientName}");
        //}
        /*const*/ licUser = JSON.parse(data);
        console.log("<licenseNumber = " + licUser.licenseNumber + "> <clientName = " + licUser.clientName + ">");
        licenceNumber = licUser.licenseNumber;
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

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


console.log("---------delay before starting server");
run();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;
app.set('view engine', 'ejs');
app.use(express.static("/")); // folder of static data, i.e. css
app.use(bodyParser.urlencoded({ extended: true })); // to receive form data

app.get("/", (req, res) => {
    /*res.status(200).send("<h1>Welcome to ejs</>");*/
    res.status(200).render("index", { pageTitle: "License page", licenceNumber: licenceNumber });
});

app.post("/", (req, res) => {
    console.log(req.body.licenceNumber);
    res.status(201).send("License request has been performed");
    //console.log(licNumber);
});

app.listen(PORT, () => {
    console.log('server is running at http://localhost:' + PORT);
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


async function run() {
    await delay(1000);
    console.log('This printed after about 1 second');
}