const express = require('express');

const routes = express.Router();

const {listarPersonal, obtenerPersona, crear, editar, eliminar} = require('../controllers/personalController');

routes.get('/personal/', listarPersonal);

routes.get('/personal/:id', obtenerPersona)

routes.post('/personal/', crear )

routes.put('/personal/:id', editar)

routes.delete('/personal/:id', eliminar)

module.exports = routes;