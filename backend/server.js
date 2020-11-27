// Create express app
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static('public'));

//Routes - seperated routes and server
app.use(require('./routes')); 

// Server port
let HTTP_PORT = process.env.PORT || 8000;

let server = app.listen(HTTP_PORT, function () {

    let host = server.address().address
    let port = server.address().port
  
    console.log("App listening at local", host, port)
})
