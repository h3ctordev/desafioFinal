const cartsList = require('../db/carts.json');
const mockup = [...cartsList];

// { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

const carts = {
  create: (req, res) => {
    console.log('create cart');
    return res.status(200).json({});
  },
  delete: (req, res) => {
    console.log('empty cart');
    return res.status(200).json({});
  },
  getById: (req, res) => {
    console.log('get all products cart by id');
    return res.status(200).json({});
  },
  addProduct: (req, res) => {
    console.log('add products to carts');
    return res.status(200).json({});
  },
  deleteProduct: (req, res) => {
    console.log('delete product by cart id and product id');
    return res.status(200).json({});
  },
};

module.exports = carts;
