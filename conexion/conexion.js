const { error } = require('console');
const mysql =require('mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'recomendacion'
});

conexion.connect((error)=>{
    if(error){
        console.error('El error de conexión es: '+error);
        return
    }
    console.log('Se ha conectado correctamente a las Base MySQL');
    
})

module.exports= conexion;