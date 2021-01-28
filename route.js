const express = require('express');
const { title } = require('process');
const router = express.Router();
const conexion =  require('./conexion/conexion');
const passport = require('passport');


router.get('/',(req, res)=>{
    conexion.query('select * from tbljuegos where status=1', (error, results)=>{
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

router.get('/login',(req, res)=>{
    res.render('login')
})

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
router.post('/save', crud.save);
router.post('/save_juego', crud.save_juego);
router.post('/editar_juego', crud.editar_juego);



//Login
router.get('/login', (req, res, next) => {
    res.render('login');
});
  
router.post('/login', passport.authenticate('local-login', {
successRedirect: '/profile',
failureRedirect: '/login',
failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }
  
module.exports = router;