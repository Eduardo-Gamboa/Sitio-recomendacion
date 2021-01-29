const express = require('express');
const { title } = require('process');
const router = express.Router();
const conexion =  require('./conexion/conexion');
const passport = require('passport');

var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();



router.get('/',(req, res)=>{
    conexion.query('select * from tbljuegos where status=2', (error, results)=>{
        if(error){
            throw error;    
        }else{
            res.render('index', {results:results});
        }
    })
})

router.get('/mygames',(req, res)=>{
    conexion.query('select * from tbljuegos where status=2', (error, results)=>{
        if(error){
            throw error;    
        }else{
            res.render('mygames', {results:results});
        }
    })
})

//Juegos que validará el admin xdxd
router.get('/dash',(req, res)=>{
    conexion.query('select * from tbljuegos where status=1', (error, results)=>{
        if(error){
            throw error;    
        }else{
            res.render('dash', {results:results});
        }
    })
})

//Juegos ya validados
router.get('/dashYaValidados',(req, res)=>{
    conexion.query('select * from tbljuegos where status=2', (error, results)=>{
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
    res.render('login')
})

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

router.get('/dashYaValidados',(req, res)=>{
    res.render('dashYaValidados')
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

/*Buscador*/ 
router.post('/',(req, res)=>{
    const busqueda = req.body.busqueda;
    const sqlquery = "select * from tbljuegos where status=1 and titulo LIKE '%"+busqueda+"%'";
    console.log(sqlquery);
    conexion.query(sqlquery ,(error, results)=>{
        if(error){
            throw error;    
        }else{
            res.render('index', {results:results});
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

// //login

// // const conexion = require('../conexion/conexion');


router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
        conexion.query('SELECT * FROM tblusuarios WHERE correo = ? AND contra = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                // var id = results.RowDataPacket.id_user;
                const data = JSON.parse(JSON.stringify(results));
                // var id = data[0][];
                console.log("EL ID DEL USUARIOOOOOOOOOOOOOOOO");
                console.log(data);
                req.session.loggedin = true;
                req.session.email = email;
                console.log(email);
                res.render('profile', {results: results});

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

router.get('/profile', function(request, response) {
    if (request.session.loggedin) {
        response.send('BIENVENIDO DE VUELTA , ' + request.session.correo + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});


// //end login
  
module.exports = router;