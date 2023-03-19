// This function retrieves the licence and client name from the remote licencing webservice and manages the html via ejs dynamically to create html.
const http = require('http');
var licUser;
var licenceNumber = "";
var clientName = "";

const PORT_SERVER = 8080;
http.post
http.get('http://localhost:' + PORT_SERVER + '/LicenseHandler', res => {
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
        clientName = licUser.clientName;
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

console.log("---------delay before starting server");
sleep();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT_EJS = 3001;
app.set('view engine', 'ejs');
app.use(express.static("/")); // folder of static data, i.e. css
app.use(bodyParser.urlencoded({ extended: true })); // to receive form data

// Display html page..
app.get("/", (req, res) => {
    /*res.status(200).send("<h1>Welcome to ejs</>");*/
    res.status(200).render("index", {
        pageTitle: "License page",
        licenceNumber: licenceNumber, //inject the licence data into html page..
        clientName: clientName //inject the data clienname into html page..
    });
});

// Management of html data that has changed like licence and clientname
app.post("/", (req, res) => {
    console.log("licenceNumber: " + req.body.licenceNumber); 
    console.log("clientName: " + req.body.clientName); 
    licUser.licenseNumber = req.body.licenceNumber; //get the modified data licence data from html page..
    licUser.clientName = req.body.clientName; //get the modified data clientName data from html page..
    res.status(201).send("License request has been performed");

    //var postData = JSON.stringify(licUser);

    const data = JSON.stringify({
        'LicenseNumber': licUser.licenseNumber,
        'ClientName': licUser.clientName
    });    
    console.log(data);

    const options = {
        hostname: 'localhost',/*'http://localhost',*/
        port: PORT_SERVER,
        path: '/LicenseHandler',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };
    console.log("after option");
    const reqPost = http.request(options, (resPos) => {
        console.log(`statusCode: ${resPos.statusCode}`);
        console.log("after request");
        resPos.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    reqPost.on('error', (error) => {
        console.error(error);
    });

    reqPost.write(data);
    reqPost.end();
});

app.listen(PORT_EJS, () => {
    console.log('server is running at http://localhost:' + PORT_EJS);
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function sleep() {
    await delay(1000);
    console.log('This printed after about 1 second');
}