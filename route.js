const express = require('express');
const { title } = require('process');
const router = express.Router();
const conexion =  require('./conexion/conexion');


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
            res.redirect('/');
        }
    })
})

const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/save_juego', crud.save_juego);
router.post('/editar_juego', crud.editar_juego);

module.exports = router;