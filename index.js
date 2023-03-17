const express = require("express");

const app = express();
const PORT = 3001; 
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    /*res.status(200).send("<h1>Welcome to ejs</>");*/
    res.status(200).render("index", {pageTitle: "home page"});

});

app.listen(PORT, () => {
    console.log('server is running at http://localhost:' + PORT);
})