const conexion =  require('../conexion/conexion');

exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const contra = req.body.contra;
    const id_perfil = req.body.id_perfil;
    conexion.query('INSERT INTO tblusuarios SET?',{nombre:nombre, correo:correo, contra:contra, id_perfil:id_perfil}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    } )
};

exports.save_juego = (req, res)=>{
    const titulo = req.body.titulo;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;
    const status = req.body.status;
    conexion.query('INSERT INTO tbljuegos SET?',{titulo:titulo, imagen:imagen, descripcion:descripcion, status:status}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/mygames');
        }
    } )
};


exports.editar_juego = (req,res)=>{
    const id_juegos= req.body.id_juegos;
    const titulo= req.body.titulo;
    const imagen= req.body.imagen;
    const descripcion= req.body.descripcion;
    const status= req.body.status;
    conexion.query('UPDATE tbljuegos SET ? WHERE id_juegos=?', [{ titulo:titulo,descripcion:descripcion, imagen:imagen,status:status,},id_juegos], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}


