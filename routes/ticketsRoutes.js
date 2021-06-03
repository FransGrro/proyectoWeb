const express = require('express');

const routes = express.Router();

const {listarTickets, obtenerTicket, crear, editar, eliminar} = require('../controllers/ticketsController');

routes.get('/tickets/', listarTickets);

routes.get('/tickets/:id', obtenerTicket)

routes.post('/tickets/', crear )

routes.put('/tickets/:id', editar)

routes.delete('/tickets/:id', eliminar)

module.exports = routes;