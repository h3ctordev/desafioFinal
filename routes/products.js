const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.get('/:id?', controllers.products.get); // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.post('/', controllers.products.create); // Para incorporar productos al listado (disponible para administradores)
router.put('/:id', controllers.products.update); // Actualiza un producto por su id (disponible para administradores)
router.delete('/:id', controllers.products.delete); // Borra un producto por su id (disponible para administradores)

module.exports = router;
