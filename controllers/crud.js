    const conexion =  require('../conexion/conexion');
    const { use } = require('../route');

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
    }

