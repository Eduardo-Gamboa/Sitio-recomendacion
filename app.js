const { json } = require("express");
const express = require("express");
const app = express();

const session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');


// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use('/', require('./route'));

app.listen(5000, ()=>{
    console.log("SERVER corriendo en http://localhost:5000");
});