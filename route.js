const express = require('express');
const { title } = require('process');
const router = express.Router();
const conexion =  require('./conexion/conexion');


/* router.get('/',(req, res)=>{
    conexion.query('select * from tblusuarios', (error, results)=>{
        if(error){
            throw error;    
        }else{
            res.render('index', {results:results});
        }
    })
})
 */
router.get('/',(req, res)=>{
    conexion.query('select * from tbljuegos', (error, results)=>{
        if(error){
            throw error;    
        }else{
            res.render('index', {results:results});
        }
    })
})


router.get('/create',(req, res)=>{
    res.render('create')
})

router.get('/login',(req, res)=>{
    res.render('login')
})


const crud = require('./controllers/crud');
router.post('/save', crud.save)


module.exports = router;