const connection = require('../config/connection');


function listarPersonal(req, res) {
    if(connection) {
        let sql = "SELECT * FROM personal";
        connection.query(sql, (err, personal) => {
            if(err) {
                res.json(err);
            } else {
                console.log(personal);
                res.json(personal);
            }
        });
    }
}

function obtenerPersona(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM personal WHERE per_id = ${connection.escape(id)}`;
        connection.query(sql, (err, empleado) => {
            if(err){
                console.log(err);
            } else {
                var feedback = "";
                if(empleado === undefined || empleado.length == 0)
                feedback = "Persona no encontrada";

                res.json({data: empleado[0], mensaje: feedback});
            }
        })
    }

}

function crear(req, res){
    if(connection){
        console.log(req.body);
        const empleado = req.body;

        if(!empleado.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(!empleado.apellidos){
            return res.status(400).send({error: true, mensaje: "El apellido es obligatorio"});
        }

        if(empleado.telefono && empleado.telefono.length !== 10){
            return res.status(400).send({error: true, mensaje: "La longitud debe ser de 10 caracteres"});
        }

        let sql = "INSERT INTO personal set ?";

        connection.query(sql, [empleado], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Persona añadida con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const empleado = req.body;

        let sql = "UPDATE personal set ? WHERE per_id = ?";

        connection.query(sql, [empleado, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Persona actualizada con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )


    }
}

function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM personal WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Persona no encontrada";
                } else {
                    mensaje = "Persona elimina con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarPersonal,
    obtenerPersona,
    crear,
    editar,
    eliminar
}