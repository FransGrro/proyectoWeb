const connection = require('../config/connection');


function listarTickets(req, res) {
    if(connection) {
        let sql = "SELECT * FROM tickets";
        connection.query(sql, (err, ticket) => {
            if(err) {
                res.json(err);
            } else {
                console.log(ticket);
                res.json(ticket);
            }
        });
    }
}

function obtenerTicket(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM tickets WHERE tic_id = ${connection.escape(id)}`;
        connection.query(sql, (err, ticket) => {
            if(err){
                console.log(err);
            } else {
                var feedback = "";
                if(ticket === undefined || ticket.length == 0)
                feedback = "Ticket no encontrada";

                res.json({data: ticket[0], mensaje: feedback});
            }
        })
    }

}

function crear(req, res){
    if(connection){
        console.log(req.body);
        const ticket = req.body;

        if(!ticket.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        let sql = "INSERT INTO tickets set ?";

        connection.query(sql, [ticket], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Ticket añadido con exito."});
            }
        })
    }
}

function editar(req, res) {
    if(connection){
        const { id } = req.params;
        const ticket = req.body;

        let sql = "UPDATE tickets set ? WHERE per_id = ?";

        connection.query(sql, [ticket, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Ticket actualizado con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )


    }
}

function eliminar(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM tickets WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Ticket no encontrado";
                } else {
                    mensaje = "Ticket deletea3 con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarTickets,
    obtenerTicket,
    crear,
    editar,
    eliminar
}