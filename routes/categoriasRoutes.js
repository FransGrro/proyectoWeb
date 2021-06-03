const express = require('express');

const routes = express.Router();

const {listarCategorias, crear, eliminar} = require('../controllers/categoriasController');

routes.get('/categorias/', listarCategorias);

routes.post('/categorias/', crear )

routes.delete('/categorias/:id', eliminar)

module.exports = routes;