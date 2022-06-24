const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/', controllers.carts.create); // Crea caro y devuelve su id
router.delete('/:id', controllers.carts.delete); // Vacía un carrito y lo elimina
router.get('/:id/productos', controllers.carts.getById); // Me permite listar todos los productos guardados en el carrito
router.post('/:id/productos', controllers.carts.addProduct); // Para incorporar productos al carrito por su id de producto
router.delete('/:id/productos/:id_prod', controllers.carts.deleteProduct); // Eliminar un producto del carrito por su id de carrito y de producto

module.exports = router;
