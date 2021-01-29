const express = require('express');
const { title } = require('process');
const router = express.Router();
const conexion =  require('./conexion/conexion');
const passport = require('passport');

var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/',(req, res)=>{
    conexion.query('SELECT j.id_juegos,j.titulo, j.imagen, j.descripcion, COUNT(r.id_game) AS reco FROM tbljuegos as j INNER JOIN tblranking as r ON j.id_juegos = r.id_game WHERE j.status = 1 GROUP BY j.titulo ORDER BY reco DESC', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results:results});
        }
    })
})

router.get('/profile',(req, res)=>{
    conexion.query('SELECT j.id_juegos,j.titulo, j.imagen, j.descripcion, COUNT(r.id_game) AS reco FROM tbljuegos as j INNER JOIN tblranking as r ON j.id_juegos = r.id_game WHERE j.status = 1 GROUP BY j.titulo ORDER BY reco DESC', (error, results)=>{
        if(error){
            throw error;
        }else{
            if (req.session.loggedin) {
                res.render('profile', {results:results});
            } else {
                res.redirect('/inicieSesion');
            }
        }
    })
})

router.get('/mygames',(req, res)=>{
    conexion.query('select * from tbljuegos where status=2 ', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('mygames', {results:results});
        }
    })
})

//DASH
router.get('/dash',(req, res)=>{
    if (req.session.loggedin =! true) {
        res.redirect('/inicieSesion');
    }
    else{
        conexion.query('select * from tbljuegos where status=2', (error, results)=>{
            if(error){
                throw error;
            }else{
                req.session.loggedin = true;
                res.render('dash', {results:results});
            }
        })
    }
});


//cerrar session
router.post('/logout', function(request, response) {
    request.session.loggedin = false;
    response.redirect('/');
    // if (request.session.loggedin) {
    //     request.session.loggedin = false;
    //     response.redirect('/');
    // } else {
    //     response.redirect('/inicieSesion');
    // }
    response.end();
});

//Juegos ya validados
router.get('/dashYaValidados',(req, res)=>{
    conexion.query('SELECT j.id_juegos,j.titulo, j.imagen, j.descripcion, COUNT(r.id_game) AS reco FROM tbljuegos as j INNER JOIN tblranking as r ON j.id_juegos = r.id_game WHERE j.status = 1 GROUP BY j.titulo ORDER BY reco DESC', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('dashYaValidados', {results:results});
        }
    })
})


router.get('/create',(req, res)=>{
    res.render('create')
})

router.get('/profile',(req, res)=>{
    res.render('profile')
})

router.get('/login',(req, res)=>{
    req.session.loggedin = false;
    res.render('login')
})

router.get('/inicieSesion',(req, res)=>{
    res.render('inicieSesion')
})

// //Juegos ya validados
router.get('/myprofileUser2', function (req, res) {
    if (req.session.loggedin) {
        var email = req.session.email;
        var password = req.session.password;
        conexion.query('SELECT * FROM tblusuarios WHERE correo = ? AND contra = ?', [email, password], function (error, datos, fields) {
            // res.render('myprofileUser2', {datos: datos});
            console.log(datos);
            // if (datos.length > 0) {
            //     // const data = JSON.parse(JSON.stringify(datos));
            //     // // var id = data[0][];
            //     // console.log("EL ID DEL USUARIOOOOOOOOOOOOOOOO");
            //     // console.log(data);
            //     // req.session.loggedin = true;
            //     // req.session.email = email;
            //     // req.session.password = password;

            //     // console.log(req.session.password);


            // } else {
            //     res.send('Incorrect Username and/or Password!');
            // }
            res.end();
        });
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});



// router.get('/myprofileUser', function(request, response) {
//     if (request.session.loggedin) {
//         response.send('BIENVENIDO DE VUELTA , ' + request.session.email + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });
// router.get('/auth',(req, res)=>{
//     res.set('auth')
// })

// app.get('/loginjeje', function (request, response) {
//     response.sendFile(path.join(__dirname, '../views' , '/login.html'));
// });

router.get('/mygames',(req, res)=>{
    res.render('mygames')
})

router.get('/create_games',(req, res)=>{
    res.render('create_games')
})

router.get('/games_admin',(req, res)=>{
    res.render('games_admin')
})

router.get('/dash',(req, res)=>{
    res.render('dash')
})

router.get('/recomendar',(req, res)=>{
    res.render('recomendar')
})

router.get('/dashYaValidados',(req, res)=>{
    res.render('dashYaValidados')
})

router.get('/myprofileUser',(req, res)=>{
    res.render('myprofileUser')
})

router.get('/myprofileUser2',(req, res)=>{
    res.render('myprofileUser2')
})


router.get('/edit/:id_juegos', (req,res)=>{
    const id_juegos= req.params.id_juegos;
    conexion.query('SELECT * FROM tbljuegos WHERE id_juegos=?',[id_juegos], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {juego:results[0]});
        }
    })
})

router.get('/recomendar/:id_juegos', (req,res)=>{
    const id_juegos= req.params.id_juegos;
    conexion.query('SELECT * FROM tbljuegos WHERE id_juegos=?',[id_juegos], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('recomendar', {juego:results[0]});
        }
    })
})

/*Buscador*/
router.post('/',(req, res)=>{
    const busqueda = req.body.busqueda;
    const sqlquery = "SELECT j.id_juegos,j.titulo, j.imagen, j.descripcion, COUNT(r.id_game) AS reco FROM tbljuegos as j INNER JOIN tblranking as r ON j.id_juegos = r.id_game WHERE j.status = 1 and titulo LIKE '%"+busqueda+"%'";
    console.log(sqlquery);
    conexion.query(sqlquery ,(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results:results});
        }
    })
})

router.post('/profile',(req, res)=>{
    const busqueda2 = req.body.busqueda2;
    const sqlquery = "SELECT j.id_juegos,j.titulo, j.imagen, j.descripcion, COUNT(r.id_game) AS reco FROM tbljuegos as j INNER JOIN tblranking as r ON j.id_juegos = r.id_game WHERE j.status = 1 and titulo LIKE '%"+busqueda2+"%'";
    console.log(sqlquery);
    conexion.query(sqlquery ,(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('profile', {results:results});
        }
    })
})


/*ELIMINAR*/
router.get('/delete/:id_juegos', (req, res)=>{
    const id_juegos= req.params.id_juegos;
    conexion.query('DELETE FROM tbljuegos WHERE id_juegos=?',[id_juegos], (error, results)=> {
        if(error){
            throw error;
        }else{
            res.redirect('/dash');
        }
    })
})

const crud = require('./controllers/crud');
const { json } = require('express');
router.post('/save', crud.save);
router.post('/save_juego', crud.save_juego);
router.post('/editar_juego', crud.editar_juego);
router.post('/save_reco', crud.save_reco);

// //login

// // const conexion = require('../conexion/conexion');




// app.get('/login',(req, res)=>{
//     res.render('login')
// })

// app.get('/loginjeje', function (request, response) {
//     response.sendFile(path.join(__dirname, '../views' + '/login.html'));
// });

// for action
router.post('/auth', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        // check if user exists
        // var id = conexion.query('SELECT id_user FROM tblusuarios WHERE correo = ? AND contra = ?', [email, password]);
        conexion.query('SELECT * FROM tblusuarios WHERE correo = ? AND contra = ?', [email, password], function (error, datos, fields) {
            if (datos.length > 0) {
                const data = JSON.parse(JSON.stringify(datos));
                // var id = data[0][];
                console.log("EL ID DEL USUARIOOOOOOOOOOOOOOOO");
                console.log(data);
                req.session.loggedin = true;
                req.session.email = email;
                req.session.password = password;

                console.log(req.session.password);

                if(req.session.email == 'admin@admin.com'){
                    req.session.loggedin = true;
                    res.redirect('/dash')
                }else{
                    req.session.loggedin = true;
                    res.render('myprofileUser', {datos: datos});
                }

                


                // res.redirect('/myprofileUser');
                //res.send(datos)
                // var admin = "admin@admin.com"
                // if(email === admin)
                //     res.render('dash', {results: results});
                // else
                //  if(email != admin)
                //     res.render('profile', {results: results});

            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});






// //end login

module.exports = router;