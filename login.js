// var mysql = require('mysql');
// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var path = require('path');

// const router = require('./route');


// const conexion = require('../conexion/conexion');


// var app = express();

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // app.get('/login',(req, res)=>{
// //     res.render('login')
// // })

// // app.get('/loginjeje', function (request, response) {
// //     response.sendFile(path.join(__dirname, '../views' + '/login.html'));
// // });


// // for action
// router.post('/auth', function (req, res) {
//     var correo = req.body.email;
//     var contra = req.body.password;
//     if (username && password) {
//         // check if user exists
//         conexion.query('SELECT * FROM tblusuarios WHERE correo = ? AND contra = ?', [correo, contra], function (error, results, fields) {
//             if (results.length > 0) {
//                 req.session.loggedin = true;
//                 req.session.correo = correo;
//                 res.redirect('/profile');
//             } else {
//                 res.send('Incorrect Username and/or Password!');
//             }
//             res.end();
//         });
//     } else {
//         res.send('Please enter Username and Password!');
//         res.end();
//     }
// });

// router.get('/profile', function(request, response) {
//     if (request.session.loggedin) {
//         response.send('BIENVENIDO DE VUELTA , ' + request.session.correo + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });