const connection = require('../config/connection');


function listarCategorias(req, res) {
    if(connection) {
        let sql = "SELECT * FROM categorias";
        connection.query(sql, (err, categorias) => {
            if(err) {
                res.json(err);
            } else {
                console.log(categorias);
                res.json(categorias);
            }
        });
    }
}

function crear(req, res){
    if(connection){
        console.log(req.body);
        const categoria = req.body;

        if(!categoria.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        let sql = "INSERT INTO categorias set ?";

        connection.query(sql, [categoria], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Categoria añadida con exito."});
            }
        })
    }
}
//que se la pelas dice
function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM categorias WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Categoria no encontrada";
                } else {
                    mensaje = "Categoria elimina con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarCategorias,
    crear,
    eliminar
}